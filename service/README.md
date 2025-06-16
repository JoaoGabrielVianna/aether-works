# ☁️ Service – Backend de Leituras de Sensores

Este serviço REST é parte da disciplina Advanced Programming and Mobile Development do curso de Engenharia da Computação – 5º semestre (FIAP). Ele complementa o aplicativo mobile, persistindo leituras de sensores em banco de dados H2 (modo arquivo).

---

### 🔧 Sobre o Serviço

O backend simula a persistência e consulta de leituras de sensores ambientais (como umidade e inclinação), que alimentam o sistema de alerta de riscos de deslizamento.

### 🧪 Funcionalidades

O serviço expõe os seguintes endpoints REST via Spring Boot:

| Método  | Rota                        | Descrição                                      |
|---------|-----------------------------|------------------------------------------------|
| POST    | /api/readings               | Cria uma nova leitura                         |
| GET     | /api/readings               | Lista todas as leituras registradas           |
| GET     | /api/readings/{sensorId}    | Lista leituras associadas a um sensor específico |
| PUT     | /api/readings/{sensorId}    | Atualiza uma leitura específica                |
| DELETE  | /api/readings/{sensorId}    | Remove uma leitura específica                  |

### 💾 Modelo de Dados

```java
@Entity
class Reading {
  @Id @GeneratedValue
  Long id;
  String sensorId;
  Double value;
  LocalDateTime timestamp;
}

```

### 🛠️ Como Executar

1. Clone este repositório:
```bash
git clone https://github.com/SEU_USUARIO/global-solution-2025.git
```
2. Acesse o diretório do backend:

```bash
cd service/
```
3. Execute o serviço:

```bash
./mvnw spring-boot:run
```


### 🌐 CORS

CORS está habilitado para permitir acesso pelo frontend mobile.


### 📄 Licença

Este projeto é de uso acadêmico e não possui licença comercial.