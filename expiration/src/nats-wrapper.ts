import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
    private _client?: Stan; //tells TS that property will not be initialized inside of traditional constructor (property initialization will not happen immediately after obj initialization)

    get client(){
        if(!this._client){
            throw new Error('Cannot access client before connection');
        }

        return this._client;
    }

    connect(clusterId: string, clientId: string, url: string){
        this._client = nats.connect(clusterId, clientId, { url });

        return new Promise<void>((resolve, reject) => {
            this.client.on('connect', () => {
              console.log('Connected to NATS');
              resolve();
            });

            this.client.on('error', (err) =>{
                reject(err);
            })
        });
        
    }

}

export const natsWrapper = new NatsWrapper(); //Sharing singleton instance throughout entire service
