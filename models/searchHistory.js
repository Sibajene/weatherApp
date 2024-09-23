const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const SearchHistory = sequelize.define('SearchHistory', {
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

module.exports = SearchHistory;
