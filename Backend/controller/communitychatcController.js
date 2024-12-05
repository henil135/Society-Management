const { Community, Group, Message } = require("../models/communitychatModel")
const Owner = require("../models/ownerModel")
const Tenant = require("../models/tenantModel")

const CreateCommunity = async (req, res) => {
    let { name, description } = req.body

    const Owners = await Owner.find()
    const Tenants = await Tenant.find()
    console.log(Owners);
    console.log(Tenants);

    const ownerIds = Owners.map((owner) => owner._id);
    const tenantIds = Tenants.map((tenant) => tenant._id);
    try {
        const community = new Community({
            name,
            description,
            createsBy: req.admin,
            members: [...ownerIds, ...tenantIds]
        })
        // community.members.push({ Owners, Tenants })
        community.save()
        res.status(200).json(community)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const communitys = async (req , res) =>{
    try{
        let data = await Community.find()
        res.status(200).json(data)
    }catch(error){
        res.status(501).json({error : error.message})
    }
}

const CreateGroup = async (req, res) => {
    let { name } = req.body

    const Owners = await Owner.find()
    const Tenants = await Tenant.find()

    const ownerIds = Owners.map((owner) => owner._id);
    const tenantIds = Tenants.map((tenant) => tenant._id);
    let data = await Community.findOne()
    try {
        const group = new Group({
            name,
            community : data._id,
            createsBy: req.admin,
            members: [...ownerIds, ...tenantIds]
        })
        // community.members.push({ Owners, Tenants })
        group.save()
        res.status(200).json(group)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const allgroup = async (req , res) =>{
    try{
        const groups = await Group.find()
        res.status(201).json(groups)
    }catch(error){
        res.status(501).json({error : error.message})
    }
}

const message = async (req , res) =>{
    let {content , group} = req.body

    try{
        let data = new Message({
            content,
            sender : req.chat,
            group,
        })
        res.status(201).json(data)
    }catch(error){
        res.status(501).json({error : error.message})
    }
}

const allmessage = async (req , res) =>{
    try{
        const groups = await Message.find()
        res.status(201).json(groups)
    }catch(error){
        res.status(501).json({error : error.message})
    }
}
module.exports = { CreateCommunity , communitys , CreateGroup , allgroup , message , allmessage}