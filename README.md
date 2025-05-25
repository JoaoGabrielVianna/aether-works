# 🚀 AetherWorks - Digital Twin System  

**Sistema de monitoramento industrial** com Digital Twin, composto por:  

|                          |                         |
|--------------------------|-------------------------|
| **📱 Aplicativo Mobile** | (React Native)          |
| **🖥️ Backend API**       | (Java Spring Boot + H2) |

## 📂 Estrutura do Projeto  

```plaintext
aether-works/
├─ mobile/
├─ service/
└─ README.md
```


## 📊 Diagrama de Arquitetura

<div align="center">

```mermaid
sequenceDiagram
    participant App as 📱 App Mobile
    participant API as 🖥️ API Spring Boot
    participant DB as 🗃️ Banco H2

    App->>API: GET /api/readings
    API->>DB: SELECT * FROM readings
    DB-->>API: Dados
    API-->>App: JSON (ex: [{sensorId: "temp", value: 25.5}])
```
</div>


## 👥 Integrantes

| Nome                 | RM     |
|----------------------|--------|
| Rodrigo Panisi Pombo | 550755 |
| Guilherme Pinheiro   | 99839  |
| Nilton P G V Miranda | 97868  |
| João Gabriel Vianna  | 551963 |


## 📝 Licença

Projeto acadêmico desenvolvido para FIAP em parceria com FESTO.