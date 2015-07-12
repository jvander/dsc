/**
 * Created by JOSEVALDERLEI on 07/07/2015.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var StakeholderSchema = new Schema({
    name: { type: String, required:'required.name', trim: true },
    onionlayer: { type: String, requried: 'required.layer', trim: true },
    description: { type: String, required: 'required.description', trim: true },
    x: { type: String, required: true, trim: true },
    y: { type: String, required: true, trim: true },
    openEdit:{ type: Boolean, default: false },

    evaluationFraming: {
        problems: { type: String, trim: true },
        solutions: { type: String, trim: true }
    },
    values: [String]
});

var SemioticFrameworkSchema = new Schema({
    socialworld: [{
        requirement: String,
        restriction: String
    }],

    pragmatic: [{
        requirement: String,
        restriction: String
    }],

    semantic: [{
        requirement: String,
        restriction: String
    }],

    syntatic: [{
        requirement: String,
        restriction: String
    }],

    empirical: [{
        requirement: String,
        restriction: String
    }],

    physical: [{
        requirement: String,
        restriction: String
    }]
});

var CultureAwareRequirementsFrameworkSchema = new  Schema({
    field: {
        type: String,
        requried: 'requried.field',
        trim: true
    },

    value: {
        type: String,
        required: 'required:value',
        trim: true
    },

    requirement: {
        type: String,
        required: 'required.requirement',
        trim: true
    },

    stakeholders: [String],

    priority: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH']
    }


});

var ProblemSchema = new Schema({

    status: {type: String, enum: ['active', 'inactive', 'finished', 'suspended'], default: 'active'},

    started: {type: Date},

    finished: {type: Date},

    artefact: {type: String, enum: ['stakeholder', 'evaluationframing', 'semioticframework', 'carf']},

    owner:{type: String, required: true }, //Usuário que propôe o problema

    collaborators:[
        {
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

    semioticFramework: [SemioticFrameworkSchema],

    values: [String],

    cultureAwareRequirementsFramework: [CultureAwareRequirementsFrameworkSchema]
});

module.exports = mongoose.model('Problem', ProblemSchema);