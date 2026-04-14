package com.clinica.crm.controller;

import com.clinica.crm.service.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.clinica.crm.dto.ChatRequest;
import com.clinica.crm.dto.ChatResponse;
//import com.clinica.crm.entity.CadastroLead;

import java.util.Map;

@RestController
@RequestMapping("/webhook")
public class WhatsAppController {

    @Autowired
    private ChatbotService chatbotService;

    @PostMapping("/whatsapp")
    public ResponseEntity<?> receberMensagem(@RequestBody Map<String, Object> payload) {

        System.out.println("Payload recebido: " + payload);

        try {

            // 1. EVITA LOOP (mensagens do próprio bot)
            if (payload.get("fromMe") != null && Boolean.TRUE.equals(payload.get("fromMe"))) {
                System.out.println("Ignorando mensagem do próprio bot");
                return ResponseEntity.ok().build();
            }

            // 2. IGNORAR EVENTOS (status, callbacks etc)
            if (payload.get("type") != null && !"ReceivedCallback".equals(payload.get("type"))) {
                System.out.println("Ignorando evento não relevante: " + payload.get("type"));
                return ResponseEntity.ok().build();
            }

            // 3. VALIDAR TELEFONE
            if (payload.get("phone") == null) {
                System.out.println("⚠️ Payload sem telefone");
                return ResponseEntity.ok().build();
            }

            String telefone = payload.get("phone").toString();

            // 4. CAPTURAR MENSAGEM COM SEGURANÇA
            String mensagem = null;

            if (payload.get("message") != null) {
                mensagem = payload.get("message").toString();

            } else if (payload.get("text") instanceof Map<?, ?>) {
                Map<?, ?> text = (Map<?, ?>) payload.get("text");

                if (text.get("message") != null) {
                    mensagem = text.get("message").toString();
                }
            }

            // 5. IGNORAR SE NÃO TIVER MENSAGEM
            if (mensagem == null || mensagem.isBlank()) {
                System.out.println("⚠️ Mensagem vazia ignorada");
                return ResponseEntity.ok().build();
            }

            System.out.println(" Telefone: " + telefone);
            System.out.println(" Mensagem: " + mensagem);

            String nome = "Cliente WhatsApp";

            // tentar pegar nome direto
            if (payload.get("senderName") != null) {
                nome = payload.get("senderName").toString();
            }

            // fallback: dentro de sender
            else if (payload.get("sender") instanceof Map<?, ?>) {
                Map<?, ?> sender = (Map<?, ?>) payload.get("sender");

                if (sender.get("name") != null) {
                    nome = sender.get("name").toString();
                }
            }

            //  NOVO: VERIFICA SE JÁ ESTÁ COM ATENDENTE (implmentação futura)
            //CadastroLead leadAnterior = chatbotService.buscarUltimoLeadPorTelefone(telefone);

            /*if (leadAnterior != null && "ATENDENTE".equals(leadAnterior.getInteresse())) {
                System.out.println(" Lead já está com atendente, bot não responderá");
                return ResponseEntity.ok().build();
            }*/

            // 6. CRIAR CHAT REQUEST
            ChatRequest chatRequest = new ChatRequest();
            chatRequest.setMensagem(mensagem);

            Long idLead = chatbotService.buscarOuCriarLead(telefone, nome, chatRequest);

            chatRequest.setIdLead(idLead);
            chatRequest.setIdClinica(1L);

            // 7. PROCESSAR CHATBOT
            ChatResponse response = chatbotService.processar(chatRequest);

            // 8. RESPONDER NO WHATSAPP
            chatbotService.enviarMensagemWhatsApp(telefone, response.getMensagemBot());

            return ResponseEntity.ok().build();

        } catch (Exception e) {
            System.out.println("❌ ERRO NO WEBHOOK:");
            e.printStackTrace();
            return ResponseEntity.ok("Erro ao processar: " + e.getMessage());
        }
    }
}