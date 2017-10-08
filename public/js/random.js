var sentences = ["Hello How are you", "How much does it cost", "my name is", "What is your name", "where are the restrooms please", "sorry I do not speak the language", "sorry I don’t understand", "can you speak more slowly, please", "I’m sorry", "Nice to meet you", "how old are you", "What time is it"];

var valueText = $('#textBox')[0].value;
var randomIcon = $('#randomIcon')[0];
console.log("before Clicked");
randomIcon.addEventListener('click', function(){
	console.log("Clicked");
	var sentence = sentences[Math.floor(Math.random()*sentences.length)];
	valueText = sentence;
});
