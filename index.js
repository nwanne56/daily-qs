var questions = [{
        "id": 1,
        "top": "If your house was on fire, and you could only save one ~object...`",
        "bottom": "What’s like a ~super niche or sentimental` thing to you that you would save?"
    },
    {
        "id": 2,
        "top": "If you could have a ~lifetime supply` of any item under $10...",
        "bottom": "what would it be?"
    },
    {
        "id": 3,
        "top": "Iced coffee... water... milk tea... ~Baja Blast`...",
        "bottom": "What's your favorite drink?"
    }
    ]

var question = questions[Math.floor(Math.random() * questions.length)];

var contain = document.createElement('div');
var topdiv = document.createElement('div');
var botdiv = document.createElement('div');


topdiv.className = 'question';
topdiv.id = 'top';
question.top = question.top.replace(/~/, "<b>");
question.top = question.top.replace(/`/, "</b>");

botdiv.className = 'question';
botdiv.id = 'bottom';

question.bottom = question.bottom.replace(/~/, "<b>");
question.bottom = question.bottom.replace(/`/, "</b>");


topdiv.innerHTML = `<p>${question.top}</p>`;
botdiv.innerHTML = `<p>${question.bottom}</p>`;



document.body.appendChild(topdiv);
document.body.appendChild(botdiv);