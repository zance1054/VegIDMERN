import React, {Component} from 'react'
//Pulls tips for our Home Screen
var dailyTips =["Try not to kill your plants", "Plants exfoliate oxygen - Buy lots of plants!",
                "Water your plants!", "Plants undergo photosynthesis which\nrequires the sun",
                "Watch out for bugs that might eat your plants!"];

var RandomNumber = Math.floor(Math.random() * dailyTips.length);

export function getDailyTip(){
    return dailyTips[RandomNumber];
}