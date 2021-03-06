const mongoose = require('mongoose');
require('dotenv').config();

//Connecting to the Server of my DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
// Creating a Collection of a Person
personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    favoriteFoods: [String]
});

// Model creation

const Person = mongoose.model('Person', personSchema);

// Create first record in a Person Model

const firstPerson = new Person({
    name: 'Firas',
    age:     24,
    favoriteFoods: ['Orange', 'Frawla']
})

firstPerson.save((err, data) => {
    err ? console.error(err) : console.log(`${firstPerson.name} data is saved`)
})

// Create Many record in a Person Model

Person.create([
    {
        name: 'Hejer',
        age: 26,
        favoriteFoods: ['Orange', 'fraise']
    },

    {
        name: 'Tarek',
        age: 26,
        favoriteFoods: ['Banane']
    },

    {
        name: 'oussema',
        age: 25,
        favoriteFoods: ['Manga', 'Kiwi']
    }
], err => {
    err ? console.error(err) : console.log('Your Records are Added Successfuly')
}
)

// Find all the people having a given name

Person.find({ name: 'Firas' }, (err, data) => {
    err ? console.error(err) : console.log(`There are ${data.length} person having name = Ahmed`)
})

//FindOne operation by favorite food

Person.findOne({ favoriteFoods: 'Fraise' }, (err, data) => {
    err ? console.error(err) : console.log(`${data.name} like Fraise`)
})

// Find a Model by ID

Person.findById("60075f6af7a2300b381dc9a5", (err, data) => {
    err ? console.error(err) : console.log("we find the person with ID:" + data._id)
})

// Find and update a Model

Person.findByIdAndUpdate("60075f6af7a2300b381dc9a5", { $push: { favoriteFoods: "hamburger" } }, (err, data) => {
    if (err) { console.error(err); }
    else {
        data.save((err, doc) => {
            err ? console.error(err) : console.log('Your Data was Updated' + doc.favoriteFoods);
        })
    }
})

// Find One and Update 

Person.findOneAndUpdate({ name: "oussema" }, { age: '20' }, { new: true }, (err, data) => {
    err ? console.error(err) : console.log('Your data updated ' + data.name + ' ' + data.age + ' ans')
})

// Find by Id and Delete the document

Person.findByIdAndRemove("60075f6af7a2300b381dc9a5", (err, data) => {
    err ? console.error(err) : console.log(data._id + ' Document removed')
})

//Delete Many Documents with model.remove()

Person.remove({ name: "hejer" }, (err) => {
    err ? console.error(err) : console.log('All document with name Mary are remved')
})

//Find people who like Banane

Person.find({ favoriteFoods: "Manga" }).sort({ name: 1 }).limit(2).select({ age: 0 }).exec((err, data) => {
    err ? console.error(err) : console.log(data)
});