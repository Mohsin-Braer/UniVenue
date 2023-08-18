import mongoose from 'mongoose';
import { natsWrapper } from './nats-wrapper';
import { app } from './app';
import { OrderCreatedListener } from './events/listeners/order-created-listener';
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener';

import { TicketCreatedPublisher } from './events/publishers/ticket-created-publisher';
import { Location } from './models/location';
import { Ticket } from './models/tickets';
import { EventCategory } from '@crescenttheaters/common';



const start = async () => {
    console.log('Starting...');

    if(!process.env.JWT_KEY){   // TS will give an error if we don't check to see this value actually exists
        throw new Error("No key 'JWT_KEY' found");
    }

    if(!process.env.MONGO_URI){
        throw new Error('MONGO_URI must be defined');
    }

    if(!process.env.NATS_URL){
        throw new Error('NATS_URL must be defined');
    }

    if(!process.env.NATS_CLUSTER_ID){
        throw new Error('NATS_CLUSTER_ID must be defined');
    }

    if(!process.env.NATS_CLIENT_ID){
        throw new Error('NATS_CLIENT_ID must be defined');
    }

    try{
        await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);

        natsWrapper.client.on('close', () => {
            console.log("NATS connection closing");
            process.exit();
        });
        process.on('SIGINT', () => { natsWrapper.client.close()});
        process.on('SIGTERM', () => { natsWrapper.client.close()});

        new OrderCreatedListener(natsWrapper.client).listen();
        new OrderCancelledListener(natsWrapper.client).listen();

        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to the mongo db');

    } catch(err){
        console.log(err);
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000!!!');
    });
};

start();

const initialCollegeList = async () => {

    var newCollegeLocation = Location.build({
       roomType: 'Display',
       roomId: 'Display',
       university: 'Boston College',
       city: 'Boston',
       state: 'MA',
       imgUrl: 'https://i.ibb.co/GtNX8yh/boston-college-bg.jpg'
    })
    await newCollegeLocation.save();

    newCollegeLocation = Location.build({
        roomType: 'Display',
        roomId: 'Display',
        university: 'Boston University',
        city: 'Boston',
        state: 'MA',
        imgUrl: 'https://i.ibb.co/F02S4g5/boston-univeristy-bg.jpg'
    })
    await newCollegeLocation.save();

    newCollegeLocation = Location.build({
        roomType: 'Display',
        roomId: 'Display',
        university: 'Northeastern University',
        city: 'Boston',
        state: 'MA',
        imgUrl: 'https://i.ibb.co/N16C1Sv/northeastern-bg.jpg'
    })
    await newCollegeLocation.save();

    newCollegeLocation = Location.build({
        roomType: 'Display',
        roomId: 'Display',
        university: 'Harvard University',
        city: 'Cambridge',
        state: 'MA',
        imgUrl: 'https://i.ibb.co/fXChj1h/harvard-bg.webp'
    })
    await newCollegeLocation.save();

    newCollegeLocation = Location.build({
        roomType: 'Display',
        roomId: 'Display',
        university: 'MIT',
        city: 'Cambridge',
        state: 'MA',
        imgUrl: 'https://i.ibb.co/D9rSswL/mit-bg.webp'
    })
    await newCollegeLocation.save();

    newCollegeLocation = Location.build({
        roomType: 'Display',
        roomId: 'Display',
        university: 'Umass Amherst',
        city: 'Cambridge',
        state: 'MA',
        imgUrl: 'https://i.ibb.co/CMsKRKf/umass-bg.jpg'
    })
    await newCollegeLocation.save();


    const locationList = await Location.find({});

};

const initialTicketList = async () => {

    var newCollegeSpace = Location.build({
        roomType: 'Conte Forum',
        roomId: 'A001',
        university: 'Boston College',
        city: 'Boston',
        state: 'MA',
        imgUrl: 'https://i.ibb.co/JcP3mrc/bc-conte-forum.jpg',
    })
    await newCollegeSpace.save();

    var collegeSpaceTicket = Ticket.build({
        title: 'BC Eagles vs Duke Blue Devils',
        price: 260,
        date: new Date('2023/12/15'),
        category: EventCategory.Sports,
        location: newCollegeSpace,
        userId: 'MohsinBraer'
    });
    await collegeSpaceTicket.save();

    await new TicketCreatedPublisher(natsWrapper.client).publish({ // Publishing event with ticket info to NATS Streaming Server event bus
        id: collegeSpaceTicket.id,
        title: collegeSpaceTicket.title,
        price: collegeSpaceTicket.price,
        version: collegeSpaceTicket.version,
        userId: collegeSpaceTicket.userId,
        date: collegeSpaceTicket.date.toISOString(),
        category: collegeSpaceTicket.category,
        location: {
            roomType: newCollegeSpace.roomType,
            roomId: newCollegeSpace.roomId,
            university: newCollegeSpace.university,
            city: newCollegeSpace.city,
            state: newCollegeSpace.state,
            imgUrl: newCollegeSpace.imgUrl,
        },
    });


    newCollegeSpace = Location.build({
        roomType: 'Rich Hall',
        roomId: 'R136',
        university: 'Boston University',
        city: 'Boston',
        state: 'MA',
        imgUrl: 'https://i.ibb.co/T2sXK7C/bu-open-space.jpg',
    })
    await newCollegeSpace.save();

    collegeSpaceTicket = Ticket.build({
        title: 'Open Collaborative Space',
        price: 50,
        date: new Date('2023/11/23'),
        category: EventCategory.Study,
        location: newCollegeSpace,
        userId: 'MohsinBraer'
    });
    await collegeSpaceTicket.save();

    await new TicketCreatedPublisher(natsWrapper.client).publish({ // Publishing event with ticket info to NATS Streaming Server event bus
        id: collegeSpaceTicket.id,
        title: collegeSpaceTicket.title,
        price: collegeSpaceTicket.price,
        version: collegeSpaceTicket.version,
        userId: collegeSpaceTicket.userId,
        date: collegeSpaceTicket.date.toISOString(),
        category: collegeSpaceTicket.category,
        location: {
            roomType: newCollegeSpace.roomType,
            roomId: newCollegeSpace.roomId,
            university: newCollegeSpace.university,
            city: newCollegeSpace.city,
            state: newCollegeSpace.state,
            imgUrl: newCollegeSpace.imgUrl,
        },
    });


    newCollegeSpace = Location.build({
        roomType: 'Blackman Auditorium',
        roomId: 'B123',
        university: 'Northeastern University',
        city: 'Boston',
        state: 'MA',
        imgUrl: 'https://i.ibb.co/ygQYx9P/northeastern-auditorium.jpg',
    })
    await newCollegeSpace.save();

    collegeSpaceTicket = Ticket.build({
        title: 'Computer Science Society Alumni Reunion',
        price: 15,
        date: new Date('2023/10/24'),
        category: EventCategory.Community,
        location: newCollegeSpace,
        userId: 'MohsinBraer'
    });
    await collegeSpaceTicket.save();

    await new TicketCreatedPublisher(natsWrapper.client).publish({ // Publishing event with ticket info to NATS Streaming Server event bus
        id: collegeSpaceTicket.id,
        title: collegeSpaceTicket.title,
        price: collegeSpaceTicket.price,
        version: collegeSpaceTicket.version,
        userId: collegeSpaceTicket.userId,
        date: collegeSpaceTicket.date.toISOString(),
        category: collegeSpaceTicket.category,
        location: {
            roomType: newCollegeSpace.roomType,
            roomId: newCollegeSpace.roomId,
            university: newCollegeSpace.university,
            city: newCollegeSpace.city,
            state: newCollegeSpace.state,
            imgUrl: newCollegeSpace.imgUrl,
        },
    });


    newCollegeSpace = Location.build({
        roomType: 'Graduate Center Lecture Room',
        roomId: 'GC435',
        university: 'Harvard University',
        city: 'Cambridge',
        state: 'MA',
        imgUrl: 'https://i.ibb.co/vwv5Yf2/harvard-classroom.jpg',
    })
    await newCollegeSpace.save();

    collegeSpaceTicket = Ticket.build({
        title: 'Arab Student Association Greater Boston Event',
        price: 20,
        date: new Date('2024/01/05'),
        category: EventCategory.Community,
        location: newCollegeSpace,
        userId: 'MohsinBraer'
    });
    await collegeSpaceTicket.save();

    await new TicketCreatedPublisher(natsWrapper.client).publish({ // Publishing event with ticket info to NATS Streaming Server event bus
        id: collegeSpaceTicket.id,
        title: collegeSpaceTicket.title,
        price: collegeSpaceTicket.price,
        version: collegeSpaceTicket.version,
        userId: collegeSpaceTicket.userId,
        date: collegeSpaceTicket.date.toISOString(),
        category: collegeSpaceTicket.category,
        location: {
            roomType: newCollegeSpace.roomType,
            roomId: newCollegeSpace.roomId,
            university: newCollegeSpace.university,
            city: newCollegeSpace.city,
            state: newCollegeSpace.state,
            imgUrl: newCollegeSpace.imgUrl,
        },
    });


    newCollegeSpace = Location.build({
        roomType: 'MIT 10-250 Lecture Hall',
        roomId: 'M10-250',
        university: 'Massachusetts Institute of Technology',
        city: 'Cambridge',
        state: 'MA',
        imgUrl: 'https://i.ibb.co/n0Zrdh5/mit-lecture-hall.jpg',
    })
    await newCollegeSpace.save();

    collegeSpaceTicket = Ticket.build({
        title: 'Zero Robotics',
        price: 20,
        date: new Date('2024/06/12'),
        category: EventCategory.Other,
        location: newCollegeSpace,
        userId: 'MohsinBraer',
    });
    await collegeSpaceTicket.save();

    await new TicketCreatedPublisher(natsWrapper.client).publish({ // Publishing event with ticket info to NATS Streaming Server event bus
        id: collegeSpaceTicket.id,
        title: collegeSpaceTicket.title,
        price: collegeSpaceTicket.price,
        version: collegeSpaceTicket.version,
        userId: collegeSpaceTicket.userId,
        date: collegeSpaceTicket.date.toISOString(),
        category: collegeSpaceTicket.category,
        location: {
            roomType: newCollegeSpace.roomType,
            roomId: newCollegeSpace.roomId,
            university: newCollegeSpace.university,
            city: newCollegeSpace.city,
            state: newCollegeSpace.state,
            imgUrl: newCollegeSpace.imgUrl,
        },
    });


    newCollegeSpace = Location.build({
        roomType: 'Rudd Field',
        roomId: 'N/A',
        university: 'University of Massachusetts Amherst',
        city: 'Amherst',
        state: 'MA',
        imgUrl: 'https://i.ibb.co/2jsPFh7/umass-field.jpg',
    })
    await newCollegeSpace.save();

    collegeSpaceTicket = Ticket.build({
        title: 'Intramural Soccer',
        price: 10,
        date: new Date('2023/10/20'),
        category: EventCategory.Community,
        location: newCollegeSpace,
        userId: 'MohsinBraer',
    });
    await collegeSpaceTicket.save();

    await new TicketCreatedPublisher(natsWrapper.client).publish({ // Publishing event with ticket info to NATS Streaming Server event bus
        id: collegeSpaceTicket.id,
        title: collegeSpaceTicket.title,
        price: collegeSpaceTicket.price,
        version: collegeSpaceTicket.version,
        userId: collegeSpaceTicket.userId,
        date: collegeSpaceTicket.date.toISOString(),
        category: collegeSpaceTicket.category,
        location: {
            roomType: newCollegeSpace.roomType,
            roomId: newCollegeSpace.roomId,
            university: newCollegeSpace.university,
            city: newCollegeSpace.city,
            state: newCollegeSpace.state,
            imgUrl: newCollegeSpace.imgUrl,
        },
    });
}

initialCollegeList();
initialTicketList();



