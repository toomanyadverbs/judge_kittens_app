______________________
#JUDGE THE KITTIES APP
______________________
A 'Hot-or-Not'-style app made to judge pictures of cats against each other.
This is the JS front end.
The Rails back end is at: https://github.com/toomanyadverbs/judge_kittens_api

###Play: http://

Front end hosted by Heroku at:
http://
Back end hosted by MongoLab:
https://

_____________________
##User Stories:

Single-page, single-user app.

A user sees two random cats - their pictures, their names, and their owners, and a toggle for two different standards (Cuteness and Majesty) to judge them by.

A user selects her preferred cat by clicking on their image. This cat is declared the winner, and the stats of both cats are displayed - how many times it has won, and how many times it has been judged.

A 'Judge Again?' button appears to load two new cats for judgement.

_____________________
##Stretch Goals:

A place for people to view individual cats and their stats.
A rankings table for which cats win which judgements what percent of the time.
A user input form for people to submit their own cats for judgement.

_____________________
##Recommended Use:

This concept was introduced to me as a drinking game. Ideally, the cats are displayed on a screen visible to all; the group argues over which cat they think is cuter. A cat is selected and its stats are viewed: one drinks if the cat that was selected was not the popular winner according to its stats. Much shouting ensues.

However, it ought to be equally fun to be able to see how your cat does against your friend's cats, and against famous Internet cats, in the eyes of the anonymous masses. Everyone thinks their pet is the cutest; who can resist an opportunity for proof?

_____________________
##Bugs:

- This app is unfinished; the Majesty toggle is not functional. Given more time, I would like to add more functionality (see 'Stretch Goals'), and make it properly mobile-responsive.

- I ran into some trouble when trying to build cat arrays in the Javascript from the backend so I wouldn't have to make as many ajax calls. I still think this is the best solution, but I need a little more time to figure out how to make it work.

_____________________
#CREATED BY:
Lindsey Grimes
http://www.lgrimes.xyz
