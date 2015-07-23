/**
 * Created by JOSEVALDERLEI on 07/07/2015.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
    nickname: {type: String, requered: true},
    msg: {type: String, requered: true},
    time: {type: Date, required: true},
});

var StakeholderSchema = new Schema({
    name: { type: String, trim: true },
    onionlayer: { type: String, trim: true },
    description: { type: String, trim: true },
    x: { type: String},
    y: { type: String},
    openEdit:{ type: Boolean, default: false },

    evaluationframing: {
        problems: { type: String, trim: true },
        solutions: { type: String, trim: true }
    },
    values: [String]
});

var CultureAwareRequirementsFrameworkSchema = new  Schema({
    pms: {
        type: String,
        requried: true,
        trim: true
    },
    values: [
        {type:String, requried:true }
    ],
    requirement: {
        type: String,
        required: true,
        trim: true
    },
    stakeholders: [String],
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High']
    }
});

var ProblemSchema = new Schema({

    status: {type: String, enum: ['active', 'inactive', 'finished', 'suspended'], default: 'active'},

    started: {type: Date, default: Date.now },

    finished: {type: Date},

    artefact: {type: String, enum: ['stakeholder', 'evaluationframing', 'semioticframework', 'carf']},

    owner:{
        fullname: {type: String, requered: true},
        nickname: {type: String, requered: true},
        email: {type: String, required: true},
    },
    collaborators:[
        {
            fullname: {type: String, requered: true},
            nickname: {type: String},
            email: {type: String, required: true},
            accept: {type:Boolean, default: false},
            adm: {type: Boolean, default: false}
        }
    ],
    title: {
        type: String,
        required: 'required.title',
        trim: true
    },

    description: {
        type: String,
        required: 'required.description',
        trim: true
    },

    stakeholders: [StakeholderSchema],

    semioticframework:{
        socialworld: {
            type: String
        },
        pragmatic: {
            type: String
        },
        semantic: {
            type: String
        },
        syntatic: {
            type: String
        },
        empirical: {
            type: String
        },
        physical: {
            type: String
        }
    },
    values: [String],
    carf: [CultureAwareRequirementsFrameworkSchema],
    chat: [MessageSchema]

});

module.exports = mongoose.model('Problem', ProblemSchema);