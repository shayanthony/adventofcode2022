import { Component } from '@angular/core';
import { inputArray } from 'src/assets/data';
import { strategyArray } from 'src/assets/strategy-data';
import { Elf } from 'src/model/elf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  doOne() {
    // split data into elves
    let arrays = inputArray.trim().split("\n")
    let elf: Elf = { totalCalories: 0, snacks: []};
    let elves: Elf[] = [];
    arrays.forEach(snack => {
      if (snack !== "") {
        let number = Number(snack)
        elf.snacks?.push(number)
      }
      else
      {
        elf.totalCalories = elf.snacks!.reduce((partialSum, a) => partialSum + a, 0)
        elves.push(elf);
        elf = { totalCalories: 0, snacks: []}
      }
    })

    // We have all our elves so work it out.
    // Q1 Find the elf carrying the most calories, how many total calories is that elf carrying?
    // Total calories carried by the top three elves
    // It's best elf + next 2
    elves.sort((a, b) => b.totalCalories - a.totalCalories);
    
    // Q1
    const bestElf = elves[0].totalCalories;
    // Q1.2
    const totalCaloriesOfTopThreeElves = elves[0].totalCalories + elves[1].totalCalories + elves[2].totalCalories
    console.log(totalCaloriesOfTopThreeElves)
  }

  doTwo() {
    let arrays = strategyArray.trim().split("\n");
    let totalScore = 0;
    arrays.forEach(game => {
      let combinedScore = 0;
      let valueOne = game.charAt(0);
      let valueTwo = game.charAt(2)
      
      switch (valueTwo)
      {
        case "Y": 
        combinedScore += 2
        break;
        case "X":
        combinedScore += 1
        break;
        case "Z":
        combinedScore += 3
        break; 
      }

      combinedScore += this.calculateWinner(valueOne, valueTwo)
      totalScore += combinedScore;
      combinedScore = 0;
    })

    console.log(totalScore)
  }

  calculateWinner(valueOne: any, valueTwo: any) {
    // Rock beats scissors
    // Paper beats rock
    // Scissors beats paper
    let score = 0;

    if (valueOne === ElfHand.ROCK)
    {
      if (valueTwo === YourHand.ROCK)
      {
        score = 3
      }
      else if (valueTwo === YourHand.PAPER) {
        score = 6;
      }
    }

    if (valueOne === ElfHand.PAPER) {
      if (valueTwo === YourHand.PAPER) {
        score = 3;
      } else if (valueTwo === YourHand.SCISSORS) {
        score = 6
      }
    }

    if (valueOne === ElfHand.SCISSORS) {
      if (valueTwo === YourHand.ROCK) {
        score = 6
      } else if (valueTwo === YourHand.SCISSORS) {
        score = 3
      }
    }

    console.log(score)
    return score
  }
}

enum ElfHand {
  ROCK = "A",
  PAPER = "B",
  SCISSORS = "C"
}

enum YourHand {
  ROCK = "X",
  PAPER = "Y",
  SCISSORS = "Z"
}

