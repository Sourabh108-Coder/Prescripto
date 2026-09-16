const mongoose=require('mongoose');

const AppointmentSchema=new mongoose.Schema(
    {
        userId:
        {
            type:String,
            required:true,
        },

        docId:
        {
            type:String,
            required:true,
        },

        slotdate:
        {
            type:String,
            required:true,
        },

        slottime:
        {
            type:String,
            required:true,
        },

        userdata:
        {
            type:Object,
            required:true,
        }, 

        docdata:
        {
            type:Object,
            required:true,
        },

        amount:
        {
            type:Number,
            required:true,
        },

        date:
        {
            type:Number,
            required:true,
        },

        canceled:
        {
            type:Boolean,
            default:false,
        },

        payment:
        {
            type:Boolean,
            default:false,
        },

        iscompleted:
        {
            type:Boolean,
            default:false,
        }
    }
)

const AppointmentModel=mongoose.models.appointment||mongoose.model('appointment',AppointmentSchema);

module.exports=AppointmentModel;