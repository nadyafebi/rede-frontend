# Rede

Rede is an educational tool that serves as an introduction to language learning.

Made by:
* Abhinav Patel ([@abhinavrpatel](https://github.com/abhinavrpatel))
* Apoorva Hiresave ([@apoorva-27](https://github.com/apoorva-27))
* Diane Tobit ([@diane27](https://github.com/diane27))
* Nadya Djojosantoso ([@nadyafebi](https://github.com/nadyafebi))

## Inspiration
With the boom of technology, people are interacting with others who may not speak the same language on a much more regular basis than they were ten years ago. Learning a new language from scratch often involves hundreds of hours of practice, and often times, a person will not end up using a lot of the vocabulary that they spent countless hours learning. Rede adopts a new and more casual approach to language learning as compared to other tools such as Quizlet or Babbel. Through Rede, a user can easily and interactively learn translations for phrases that are most relevant to them without spending hours memorizing boring flashcards.

## What it does
The current version of Rede effectively combines Google Translate with Google Maps. A user can input a word or phrase in whichever language they choose, and can see the most common translation in whichever region of the world they select. In addition, they can hear pronunciations of the translation of a certain country by hovering over that region for a couple of seconds. This way, a person is exposed to many translations of their phrase. To use Rede, simply type a phrase in the search bar, click the search icon, and scroll over countries in the GUI to explore translations!

## How we built it
We used a model that is similar to REST. The UI is running on its own instance powered by Azure, and simply asks the back end (which acts as a REST service) to provide all relevant translations and other information to it. In the future, the back end can be expanded to improve latency (via LRU-based cacheing), user profiles, etc. The UI is built using HTML CSS with Bootstrap and jQuery, along with Google Maps API and ResponsiveVoice.js. The back end is powered by Google Cloud App Engine and uses Maven as a build tool. It follows a multithreaded servlet model to handle requests, and provides all relevant data to the UI.

## Challenges we ran into
The largest challenge that we had were getting set up with Google Cloud and configuring the proper API keys, but once we figured that out, the only other major challenge we faced was figuring out how to configure our API keys when deploying on Azure.

## Accomplishments that we are proud of
We are proud of creating a tool that helps people adapt to globalization. Every one of our team members speak another language (in some case multiple others) fluently, and knowledge of those other languages have helped us in many practical situations. At the end of the day, we feel a language is simply a means in which to communicate an idea, and feel Rede is a tool that can help others communicate their ideas in a way that is fun and easy.

## What's next for Rede
We would like to add user-profile functionality to track a person's individual progress and their most common searches, etc. Additionally, we would like to implement caching for very common translations (to limit the number of API calls and improve latency) using MongoDB or a similar NoSQL-type datastore.
