package com.clinica.crm.service;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    private static final String HMAC_ALGORITHM = "HmacSHA256";

    @Value("${app.jwt.secret:clinica-crm-dev-secret-change-me}")
    private String secret;

    @Value("${app.jwt.expiration-seconds:86400}")
    private Long expirationSeconds;

    public String gerarToken(Long idClinica, String email) {
        long agora = Instant.now().getEpochSecond();
        long expiracao = agora + expirationSeconds;

        String header = "{\"alg\":\"HS256\",\"typ\":\"JWT\"}";
        String payload = "{"
                + "\"idClinica\":" + idClinica + ","
                + "\"email\":\"" + escapeJson(email) + "\","
                + "\"iat\":" + agora + ","
                + "\"exp\":" + expiracao
                + "}";

        String unsignedToken = base64Url(header) + "." + base64Url(payload);
        return unsignedToken + "." + assinar(unsignedToken);
    }

    public Long extrairIdClinica(String token) {
        validarToken(token);

        String payloadJson = decodificarParte(token.split("\\.")[1]);
        String chave = "\"idClinica\":";
        int inicio = payloadJson.indexOf(chave);

        if (inicio < 0) {
            throw new IllegalArgumentException("Token sem idClinica.");
        }

        inicio += chave.length();
        int fim = inicio;

        while (fim < payloadJson.length() && Character.isDigit(payloadJson.charAt(fim))) {
            fim++;
        }

        return Long.parseLong(payloadJson.substring(inicio, fim));
    }

    public void validarToken(String token) {
        if (token == null || token.isBlank()) {
            throw new IllegalArgumentException("Token nao informado.");
        }

        String[] partes = token.split("\\.");

        if (partes.length != 3) {
            throw new IllegalArgumentException("Token invalido.");
        }

        String unsignedToken = partes[0] + "." + partes[1];
        String assinaturaEsperada = assinar(unsignedToken);

        if (!assinaturaEsperada.equals(partes[2])) {
            throw new IllegalArgumentException("Assinatura do token invalida.");
        }

        String payloadJson = decodificarParte(partes[1]);
        long exp = extrairLong(payloadJson, "exp");

        if (Instant.now().getEpochSecond() > exp) {
            throw new IllegalArgumentException("Token expirado.");
        }
    }

    private long extrairLong(String payloadJson, String campo) {
        String chave = "\"" + campo + "\":";
        int inicio = payloadJson.indexOf(chave);

        if (inicio < 0) {
            throw new IllegalArgumentException("Campo ausente no token: " + campo);
        }

        inicio += chave.length();
        int fim = inicio;

        while (fim < payloadJson.length() && Character.isDigit(payloadJson.charAt(fim))) {
            fim++;
        }

        return Long.parseLong(payloadJson.substring(inicio, fim));
    }

    private String assinar(String conteudo) {
        try {
            Mac mac = Mac.getInstance(HMAC_ALGORITHM);
            SecretKeySpec keySpec = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), HMAC_ALGORITHM);
            mac.init(keySpec);
            byte[] assinatura = mac.doFinal(conteudo.getBytes(StandardCharsets.UTF_8));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(assinatura);
        } catch (Exception error) {
            throw new IllegalStateException("Nao foi possivel assinar o token.", error);
        }
    }

    private String base64Url(String valor) {
        return Base64.getUrlEncoder()
                .withoutPadding()
                .encodeToString(valor.getBytes(StandardCharsets.UTF_8));
    }

    private String decodificarParte(String valor) {
        return new String(Base64.getUrlDecoder().decode(valor), StandardCharsets.UTF_8);
    }

    private String escapeJson(String valor) {
        return valor == null ? "" : valor.replace("\\", "\\\\").replace("\"", "\\\"");
    }
}
