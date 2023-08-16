import mongoose from "mongoose";

interface LocationAttrs{
    roomType: string;
    roomId: string;
    university: string;
    city: string;
    state: string;
    country?: string;
    imgUrl: string;
}

export interface LocationDoc extends mongoose.Document{
    roomType: string;
    roomId: string;
    university: string;
    city: string;
    state: string;
    country?: string;
    imgUrl: string;
}

interface LocationModel extends mongoose.Model<LocationDoc>{
    build(attrs: LocationAttrs): LocationDoc;
}

const locationSchema = new mongoose.Schema(
{
    roomType: {
        type: String,
        required: true,
    },
    roomId: {
        type: String,
        required: true,
    },
    university: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state:{
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: false,
    }, 
    imgUrl: {
        type: String,
        required: false,
    }
}, {
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

locationSchema.statics.build = (attrs: LocationAttrs) => {
    return new Location(attrs);
}

const Location = mongoose.model<LocationDoc, LocationModel>('Location', locationSchema);


export { Location };

