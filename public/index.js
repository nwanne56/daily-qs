import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';

import './styles.css';

const firebaseConfig = {
  apiKey: "AIzaSyAdoN33_uYzHvdW8pDqoIKbuNZVeAOeaQ4",
  authDomain: "esoteric-burner-391507.firebaseapp.com",
  projectId: "esoteric-burner-391507",
  storageBucket: "esoteric-burner-391507.appspot.com",
  messagingSenderId: "819922824008",
  appId: "1:819922824008:web:6ebe496be532921b21a17d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getQuestion(db) {
    const questionCol = collection(db, 'dailyqs');
    const questions = await getDocs(questionCol);
    const questionList = questions.docs.map(doc => doc.data());
    const question = questionList[Math.floor(Math.random()*questionList.length)];
    return question;
}

function setupInput(question) {
    var input = document.getElementById("answer");

    var data = {
        text: input.value,
        qid: question.id
    };
    const responseCol = collection(db, 'responses');
    addDoc(responseCol, data)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
       console.error("Error adding document: ", error);
    });

    var topd = document.getElementById("top");
    var botd = document.getElementById("bottom");

    topd.style.animation = "fadeOut 2s";    
    topd.style.opacity = 0;
    botd.style.animation = "fadeOut 2s";
    input.style.animation = "fadeOut 5s";

    document.body.style.transition = "all 3s";
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";

    setTimeout(function() {
      
        var elem = document.body.lastChild;
        while (elem) {
            document.body.removeChild(elem);
            elem = document.body.lastChild;
        };
    }, 2000);


    
}

async function loadPage() {
    var question = await getQuestion(db);
    console.log(question);

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

    var input = document.createElement('input');
    input.type = "text";
    input.id = 'answer';
    input.addEventListener("keyup", function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            console.log("asd");

            setupInput(question);

        }
    });
    document.body.appendChild(input);

}

await loadPage();

// var preset_questions = [{
//         "id": 0,
//         "top": "If your house was on fire, and you could only save one ~object...`",
//         "bottom": "What’s like a ~super niche or sentimental` thing to you that you would save?"
//     },
//     {
//         "id": 1,
//         "top": "If you could have a ~lifetime supply` of any item under $10...",
//         "bottom": "What would it be?"
//     },
//     {
//         "id": 3,
//         "top": "Iced coffee... water... milk tea... ~Baja Blast`...",
//         "bottom": "What's your favorite drink?"
//     }
//     ]

// var preset_question = preset_questions[Math.floor(Math.random() * preset_questions.length)];

// var topdiv = document.createElement('div');
// var botdiv = document.createElement('div');


// topdiv.className = 'question';
// topdiv.id = 'top';
// question.top = preset_question.top.replace(/~/, "<b>");
// question.top = preset_question.top.replace(/`/, "</b>");

// botdiv.className = 'question';
// botdiv.id = 'bottom';

// question.bottom = preset_question.bottom.replace(/~/, "<b>");
// question.bottom = preset_question.bottom.replace(/`/, "</b>");

// topdiv.innerHTML = `<p>${preset_question.top}</p>`;
// botdiv.innerHTML = `<p>${preset_question.bottom}</p>`;

// document.body.appendChild(topdiv);
// document.body.appendChild(botdiv);