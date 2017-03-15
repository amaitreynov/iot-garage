# iot-garage
An IoT project with Microsoft Cognitive Services, Microsoft Azure and LUIS


###Routes to create:
- Actions:

1. get the voice data and store it
2. send the voice data to speech to text API => POST REST API microsoftSpeech/recognize
    2.1.get the returned data
    On failure 2.1.:
        return the error

3. Request retrieved text data to LUIS: POST /publishedLUISApi
    3.1. Get the returned data from LUIS
    On failure 3.1.:
        return the error

4. Request our API with retrieved LUIS entities: POST /getEntities
    => call to iotHub
    4.1. get the returned data from our API
       On failure 4.1.:
        return the error

5. Return the 4.1. data to the client

(optional) 5. Request the tts API => POST REST API microsoftSpeech/synthetise
      5.1.get the returned data
          On failure 5.1.:
              return the error
6. return the 5.1. data to the client