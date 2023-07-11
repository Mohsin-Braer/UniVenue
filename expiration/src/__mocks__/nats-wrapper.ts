
export const natsWrapper = { // mock of NATS to use during testing to avoid NATS related errors during testing
    client: { // errors with testing involve the need to call function 'publish' from NATS client with the following properties
        publish: jest.fn().mockImplementation((subject: string, data: string, callback: () => void) => { // provide needed properties to mock function to avoid publishing error by executing callback 
            callback(); 
        })
    }   
};