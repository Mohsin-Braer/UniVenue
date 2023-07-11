import { Ticket } from "../tickets";

it('implements optimistic concurrency control', async () => {
    
    const ticket = Ticket.build({
        title: 'sports',
        price: 24,
        userId: 'fhsvfhfbdf'
    });

    await ticket.save();

    const firstInstance = await Ticket.findById(ticket.id);
    const secondInstance = await Ticket.findById(ticket.id);

    firstInstance!.set({price: 50});
    secondInstance!.set({price: 120});
    

    await firstInstance!.save();


    try {
        await secondInstance!.save();
    } catch (err) {
        return;
    }

    throw new Error('Should not reach this point');
});

it('increments version number after every save to ticket', async () => {
    const ticket = Ticket.build({
        title: 'sports',
        price: 24,
        userId: 'fhsvfhfbdf'
    });

    await ticket.save();
    expect(ticket.version).toEqual(0);
    await ticket.save();
    expect(ticket.version).toEqual(1);
    await ticket.save();
    expect(ticket.version).toEqual(2);
});