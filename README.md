# Pine Care Derby Schedule Generator

## Goals of schedule generation
### Needs:
<ul>
    <li>Every racer races the same number of times</li>
    <li>Must be able to choose about how many races will be run total</li>
    <li>Must be able to choose custom car numbers</li>
</ul>

### Wants
<ul>
    <li>Each racer should be matched up with each opponent an equal number of times</li>
    <li>Each racer should run in each lane an equal number of times</li>
    <li>A racer should not race twice in a row</li>
</ul>

Note: This software successfully meets all the needs. The algorithms to complete the wants are not perfect, but get very close to accomplishing the wants. Not all number of racers/number of races can accomplish the wants. The exact stats to explain how well a generated schedule accomplishes the wants are printed at the end of the generation.
<hr>

## How to use
For easiest schedule generation, create a csv (comma separated file) that has the racer number and racer name on each row. Put that csv in the CsvInputs directory. Otherwise, you can input each racer one at a time. Then, run the RUNME.bat file. Fill out all prompts. The results will be saved to a csv file and stored in CsvInputs directory. 