# CRM com Chatbot WhatsApp (Spring Boot + Z-API)

## Visão Geral

Sistema CRM integrado ao WhatsApp com chatbot automático.

## Funcionalidades

* Recebe mensagens via WhatsApp
* Identifica intenção do cliente
* Cria e gerencia leads automaticamente
* Armazena histórico de conversas
* Responde automaticamente
* Transfere para atendimento humano

## Tecnologias

* Java 17
* Spring Boot
* MySQL
* Z-API
* ngrok

## Como executar

1. Rodar backend:
mvn spring-boot:run
2. Rodar ngrok:
ngrok http 8080
3. Configurar webhook:
https://SEU-NGROK/webhook/whatsapp

## Fluxo

WhatsApp → Z-API → ngrok → Backend → Banco → Resposta

## Autor

Eliakim Lima de Oliveira

