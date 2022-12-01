import { Component } from '@angular/core';
import { inputArray } from 'src/assets/data';
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
    const bestElf = elves[0];
    // Q1.2
    const totalCaloriesOfTopThreeElves = elves[0].totalCalories + elves[1].totalCalories + elves[2].totalCalories
    console.log(totalCaloriesOfTopThreeElves)
  }
}

