const startButton = document.getElementById('start-btn')
const questionContainer = document.getElementById('question-container')
const restartButton = document.getElementById('restart-btn')
const nextButton = document.getElementById('next-btn')
const mainInfo = document.getElementById('main-info')
const answerButtons = document.getElementById('answer-buttons')
const thanksElement = document.getElementById('thanks')
const resultElement = document.getElementById('result')
const mainPageButton = document.getElementById('main-page-btn')

let counter = document.getElementById('counter')   
let image = document.getElementById('picture')
let shuffledQuestions, currentQuestionIndex

let rightAnswers
let answered = false
let start = true


const fish = ['Amur biały', 'Boleń pospolity', 'Brzana', 'Certa', 'Ciosa', 'Czebaczek amurski', 'Jaź', 'Jelec pospolity', 'Karaś pospolity', 'Karaś Srebrzysty', 'Karp', 'Kiełb', 'Kleń', 'Krąp', 'Leszcz', 'Lin', 'Piekielnica', 'Płoć', 'Rozpiór', 'Różanka', 'Sapa', 'Strzebla potokowa', 'Świnka pospolita', 'Tołpyga biała', 'Tołpyga pstra', 'Ukleja', 'Wzdręga', 'Koza dunajska', 'Koza pospolita', 'Piskorz', 'Śliz Pospolity', 'Głowacica', 'Lipień pospolity', 'Łosoś Atlantycki', 'Pstrąg tęczowy', 'Pstrąg potokowy', 'Pstrąg źródlany', 'Sieja pospolita', 'Stynka', 'Jazgarz', 'Okoń europejski', 'Sandacz', 'Bass słoneczny', 'Bass wielkogębowy', 'Ostrobok pospolity', 'Makrela atlantycka', 'Tobiasz', 'Węgorzyca', 'Babka czarna', 'Babka mała', 'Labraks', 'Cierniczek', 'Ciernik', 'Pocierniec', 'Aloza', 'Parposz', 'Szprot', 'Śledź', 'Sardela europejska', 'Czarniak', 'Dorsz', 'Miętus pospolity', 'Plamiak', 'Gładzica', 'Stornia', 'Zimnica', 'Nagład', 'Turbot', 'Sola', 'Jesiotr rosyjski', 'Sterlet', 'Węgorz europejski', 'Zbrojnik lamparci', 'Sum pospolity', 'Sumik karłowaty', 'Belona pospolita', 'Kurek czerwony', 'Głowacz białopłetwy', 'Kur diabeł', 'Kur rogacz', 'Lisica', 'Tasza', 'Szczupak', 'Koleń pospolity', 'Minóg morski', 'Minóg rzeczny', 'Minóg strumieniowy']


mainPageButton.addEventListener('click', () => {

    // DO ZROBIENIA
    
    startButton.classList.remove('hide')
    mainInfo.classList.remove('hide')
    restartButton.classList.add('hide')
    nextButton.classList.add('hide')
    mainPageButton.classList.add('hide')
    questionContainer.classList.add('hide')
    counter.classList.add('hide')

    if (!resultElement.classList.contains('hide')) {
        resultElement.classList.add('hide')
        thanksElement.classList.add('hide')
    }

    answered = false
    start = true

})


function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}


startButton.addEventListener('click', startGame)

function startGame() {
    rightAnswers = 0

    startButton.classList.add('hide')
    mainInfo.classList.add('hide')
    restartButton.classList.remove('hide')
    nextButton.classList.remove('hide')
    mainPageButton.classList.remove('hide')
    questionContainer.classList.remove('hide')
    counter.classList.remove('hide')

    for (let i = 0; i < questions.length; i++) {
        
        if (questions[i].answers.length === 1) {
            let randomFishArray = []
            while (randomFishArray.length !== 3) {
                let randomFish = fish[Math.floor(Math.random() * fish.length)]
                if (randomFishArray.indexOf(randomFish) < 0 && randomFish !== questions[i].answers[0].text) {
                    randomFishArray.push(randomFish)
                }
            }
            
            for (let j = 0; j < 3; j++) {
                questions[i].answers.push({ text: randomFishArray[j], correct: false })

                questions[i].answers.sort(() => Math.random() - .5)
            }
        }
    }

    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    resetState()
    setNextQuestion()
}


nextButton.addEventListener('click', setNextQuestion)

function setNextQuestion() {
    resetState()

    if (start !== true) {
        currentQuestionIndex += 1
    }
    start = false

    if (currentQuestionIndex > questions.length - 1) {

        questionContainer.classList.add('hide')
        nextButton.classList.add('hide')
        thanksElement.classList.remove('hide')
        resultElement.classList.remove('hide')
        

        resultElement.innerText = `Result: ${Math.round(rightAnswers / questions.length * 100)}%`


    } else {
        showQuestion(shuffledQuestions[currentQuestionIndex])
    }
}


function showQuestion(question) {
    counter.innerText = `${currentQuestionIndex + 1} of ${questions.length}`
    image.src = question.picture
    answered = false

    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)

        answerButtons.appendChild(button)
    })
}


function selectAnswer(e) {
    const selectedButton = e.target
    if (selectedButton.dataset.correct) {
        selectedButton.classList.add('correct')
        if (answered === false) {
            rightAnswers += 1
        }
    } else {
        selectedButton.classList.add('wrong')
    }
    answered = true
}


restartButton.addEventListener('click', restartGame)

function restartGame() {
    rightAnswers = 0

    questionContainer.classList.remove('hide')
    nextButton.classList.remove('hide')
    thanksElement.classList.add('hide')
    resultElement.classList.add('hide')

    resetState()
    currentQuestionIndex = 0
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    showQuestion(shuffledQuestions[0])
}




const basicQuestions = [
    {
        picture: "https://wdk.cmc-gallery.pl/foto_kontent/amurf.jpg",
        answers: [
            { text: 'Amur biały', correct: true }
        ]
    },
    {
        picture: "https://www.medianauka.pl/biologia/grafika/ryby/bolen.jpg",
        answers: [ 
            { text: 'Boleń pospolity', correct: true }
        ]
    },
    {
        picture: "https://www.medianauka.pl/biologia/grafika/ryby/brzana.jpg",
        answers: [
            { text: 'Brzana', correct: true }
        ]
    },
    {
        picture: "https://angloo.com/wp-content/uploads/certa.jpg",
        answers: [
            { text: 'Certa', correct: true }
        ]
    },
    {
        picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Pelecus_cultratus1.jpg/1200px-Pelecus_cultratus1.jpg",
        answers: [
            { text: 'Ciosa', correct: true }
        ]
    },
    {
        picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Pseudorasbora_parva%28edited_version%29.jpg/1200px-Pseudorasbora_parva%28edited_version%29.jpg",
        answers: [
            { text: 'Czebaczek amurski', correct: true }
        ]
    },
    {
        picture: "https://www.medianauka.pl/biologia/grafika/ryby/jaz.jpg",
        answers: [
            { text: 'Jaź', correct: true }
        ]
    },
    {
        picture: "https://gdybyryby.pl/wp-content/uploads/2017/12/jelec.jpg",
        answers: [
            { text: 'Jelec pospolity', correct: true }
        ]
    },
    {
        picture: "https://www.medianauka.pl/biologia/grafika/ryby/karas-pospolity.jpg",
        answers: [
            { text: 'Karaś pospolity', correct: true }
        ]
    },
    {
        picture: "https://images.morele.net/news/i700/14785.jpg",
        answers: [
            { text: 'Karaś srebrzysty', correct: true }
        ]
    },
    {
        picture: "https://zoosafari.com.pl/wp-content/uploads/2020/03/pelnoluski.png",
        answers: [
            { text: 'Karp', correct: true }
        ]
    },
    {
        picture: "https://upload.wikimedia.org/wikipedia/commons/7/71/Riviergrondel.jpg",
        answers: [
            { text: 'Kiełb', correct: true }
        ]
    },
    {
        picture: "https://wdk.cmc-gallery.pl/foto_kontent/klen11.jpg",
        answers: [
            { text: 'Kleń', correct: true }
        ]
    },
    {
        picture: "https://wdk.cmc-gallery.pl/foto_kontent/krapf.jpg",
        answers: [
            { text: 'Krąp', correct: true }
        ]
    },
    {
        picture: "https://atlasryb.online/zdjecia/1900_1200.jpg",
        answers: [
            { text: 'Leszcz', correct: true }
        ]
    },
    {
        picture: "https://wdk.cmc-gallery.pl/foto_kontent/lin11.jpg",
        answers: [
            { text: 'Lin', correct: true }
        ]
    },
    {
        picture: "https://www.medianauka.pl/biologia/grafika/ryby/piekielnica.jpg",
        answers: [
            { text: 'Piekielnica', correct: true }
        ]
    },
    {
        picture: "https://atlasryb.online/zdjecia/2540_1200.jpg",
        answers: [
            { text: 'Płoć', correct: true }
        ]
    },
    {
        picture: "https://zasoby.ekologia.pl/animal/a/827/Ballerus_ballerus_Hungary_max.jpg",
        answers: [
            { text: 'Rozpiór', correct: true }
        ]
    },
    {
        picture: "http://www.fishing.pl/var/news/storage/images/media/foto_administracyjne/ryby/rozanka/19079-4-pol-PL/rozanka.jpg",
        answers: [
            { text: 'Różanka', correct: true }
        ]
    },
    {
        picture: "https://lh3.googleusercontent.com/proxy/DOdm5KRRLb6WyEcIst5u3jfC4TGBcUpA7gftwT4gwNP04SyFSfSvtIc_b3NGh7rZc1wxYgnzCsxgTWnGVen-eU10Fh7cAWkYyN0agRnuE31EGortiJtZ7SdLa7KTQa-4L7JkkCttqzEtLTSSKGUXcQWYoELSJAdmN9wt6Q7xlmcBhZ-OlbTQF5u9NlZkRFdO",
        answers: [
            { text: 'Sapa', correct: true }
        ]
    },
    {
        picture: "https://www.medianauka.pl/biologia/grafika/ryby/strzebla-potokowa.jpg",
        answers: [
            { text: 'Strzebla potokowa', correct: true }
        ]
    },
    {
        picture: "https://lh3.googleusercontent.com/proxy/_CEMNOBD82iTOmfQVz3n6EKEv3XGo4blC7K5RhXewvMHudOum_2WCQxdb3DwZrkRKp1yqOt1okqGrjqCVfOr6K0A5bYg-GKR3f5NH2E35Nsu1W3rxztgpXHP40gQ_Q",
        answers: [
            { text: 'Świnka pospolita', correct: true }
        ]
    },
    {
        picture: "https://wdk.cmc-gallery.pl/foto_kontent/tolpygaf.jpg",
        answers: [
            { text: 'Tołpyga biała', correct: true }
        ]
    },
    {
        picture: "https://lh3.googleusercontent.com/proxy/TMdAp2Hr_Eev-VZ83AyBWliEJBT4IDVnI1HI44B9GgWuFUmVQCyv155lcpIf2yFjHTCH_RGHZSTLIUXqs8Vf2ClMgFLPuhlg_Iv8ZnSWifG-qx_I95No5IRxAh4",
        answers: [
            { text: 'Tołpyga pstra', correct: true }
        ]
    },
    {
        picture: "https://leszcz.pl/galeria/31583.jpg",
        answers: [
            { text: 'Ukleja', correct: true }
        ]
    },
    {
        picture: "https://upload.wikimedia.org/wikipedia/commons/8/85/Cobitis_shikokuensis_2.jpg",
        answers: [
            { text: 'Koza dunajska', correct: true }
        ]
    },
    {
        picture: "https://static.wixstatic.com/media/0008cc_c0fc50e6833c168261fe3475961a5587.jpg",
        answers: [
            { text: 'Koza pospolita', correct: true }
        ]
    },
    {
        picture: "https://upload.wikimedia.org/wikipedia/commons/7/70/Misgurnus_fossilis_2009_G1.jpg",
        answers: [
            { text: 'Piskorz', correct: true }
        ]
    },
    {
        picture: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Barbatula_barbatula_k%C3%B6vi_cs%C3%ADk.jpg",
        answers: [
            { text: 'Śliz pospolity', correct: true }
        ]
    },
    {
        picture: "https://atlasryb.online/zdjecia/1100_400.jpg",
        answers: [
            { text: 'Głowacica', correct: true }
        ]
    },
    {
        picture: "https://www.wedkarstwomojapasja.pl/wp-content/uploads/2015/01/Lipie%C5%84-pospolity.jpg",
        answers: [
            { text: 'Lipień pospolity', correct: true }
        ]
    },
    {
        picture: "https://wedkuje.pl/__migo/img/ryby/ryby-kafle-losos.jpg",
        answers: [
            { text: 'Łosoś atlantycki', correct: true }
        ]
    },
    {
        picture: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Truite_arc-en-ciel.jpg",
        answers: [
            { text: 'Pstrąg tęczowy', correct: true }
        ]
    },
    {
        picture: "https://upload.wikimedia.org/wikipedia/commons/3/35/Bachforelle_Zeichnung.jpg",
        answers: [
            { text: 'Pstrąg potokowy', correct: true }
        ]
    },
    {
        picture: "https://www.medianauka.pl/biologia/grafika/ryby/pstrag-zrodlany.jpg",
        answers: [
            { text: 'Pstrąg źródlany', correct: true }
        ]
    },
    {
        picture: "http://www.wedkarstwomojapasja.pl/wp-content/uploads/2015/02/sieja.jpg",
        answers: [
            { text: 'Sieja pospolita', correct: true }
        ]
    },
    {
        picture: "http://1.bp.blogspot.com/-VPjZC3a7kM0/USEXPHWgtoI/AAAAAAAAAsw/PC5nWz7-zC4/s1600/s000096a.jpg",
        answers: [
            { text: 'Stynka', correct: true }
        ]
    },
    {
        picture: "https://atlasryb.online/zdjecia/1220_1200.jpg",
        answers: [
            { text: 'Jazgarz', correct: true }
        ]
    },
    {
        picture: "https://wdk.cmc-gallery.pl/foto_kontent/okonf.jpg",
        answers: [
            { text: 'Okoń europejski', correct: true }
        ]
    },
    {
        picture: "https://wdk.cmc-gallery.pl/foto_kontent/sandacz11.jpg",
        answers: [
            { text: 'Sandacz', correct: true }
        ]
    },
    {
        picture: "https://rybyakwariowe.eu/media/bass-sloneczny-lepomis-gibbosus-pumpkinseed-ryba-akwariowa.jpg",
        answers: [
            { text: 'Bass słoneczny', correct: true }
        ]
    },
    {
        picture: "https://zasoby.ekologia.pl/animal/a/1020/1024px-Largemouth_bass_fish_underwater_animal_in_natural_habitat_micropterus_salmoides_max.jpg",
        answers: [
            { text: 'Bass wielkogębowy', correct: true }
        ]
    },
    {
        picture: "https://fishing.pl/var/news/storage/images/media/fotki/ryby/ostrobok_pospolity/81227-3-pol-PL/ostrobok_pospolity.jpg",
        answers: [
            { text: 'Ostrobok pospolity', correct: true }
        ]
    },
    {
        picture: "https://atlasryb.online/zdjecia/4850_1200.jpg",
        answers: [
            { text: 'Makrela atlantycka', correct: true }
        ]
    },
    {
        picture: "https://atlasryb.online/zdjecia/2540_1200.jpg",
        answers: [
            { text: 'Płoć', correct: true }
        ]
    },
    {
        picture: "https://atlasryb.online/zdjecia/4820_400.jpg",
        answers: [
            { text: 'Tobiasz', correct: true }
        ]
    },
    {
        picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Zoarces_viviparus.jpg/1200px-Zoarces_viviparus.jpg",
        answers: [
            { text: 'Węgorzyca', correct: true }
        ]
    },
    {
        picture: "https://ocdn.eu/zapytaj/MDA_/d90664da-5ba8-4689-ec78-244d90faf446.jpeg",
        answers: [
            { text: 'Babka czarna', correct: true }
        ]
    },
    {
        picture: "https://sphoto.nasza-klasa.pl/52141858/7/main/0bafd764d7.jpeg",
        answers: [
            { text: 'Babka mała', correct: true }
        ]
    },
    {
        picture: "https://ryby.wwf.pl/wp-content/uploads/2016/10/287835.jpg",
        answers: [
            { text: 'Labraks', correct: true }
        ]
    },
    {
        picture: "https://atlasryb.online/zdjecia/820_400.jpg",
        answers: [
            { text: 'Cierniczek', correct: true }
        ]
    },
    {
        picture: "https://atlasryb.online/zdjecia/860_400.jpg",
        answers: [
            { text: 'Ciernik', correct: true }
        ]
    },
    {
        picture: "https://wedkuje.pl/foto_news/pocierniec.jpg",
        answers: [
            { text: 'Pocierniec', correct: true }
        ]
    },
    {
        picture: "https://atlasryb.online/zdjecia/10_400.jpg",
        answers: [
            { text: 'Aloza', correct: true }
        ]
    },
    {
        picture: "https://wedkuje.pl/foto_news/parposz.jpg",
        answers: [
            { text: 'Parposz', correct: true }
        ]
    },
    {
        picture: "https://atlasryb.online/zdjecia/3630_1200.jpg",
        answers: [
            { text: 'Szprot', correct: true }
        ]
    },
    {
        picture: "https://fajnepodroze.pl/wp-content/uploads/2020/04/sledz-800x445.jpg",
        answers: [
            { text: 'Śledź', correct: true }
        ]
    },
    {
        picture: "https://www.fishing.pl/var/news/storage/images/media/fotki/ryby/sardela_europejska_chamsa/82983-3-pol-PL/sardela_europejska_chamsa.jpg",
        answers: [
            { text: 'Sardela europejska', correct: true }
        ]
    },
    {
        picture: "https://www.medianauka.pl/biologia/grafika/ryby/czarniak-1.jpg",
        answers: [
            { text: 'Czarniak', correct: true }
        ]
    },
    {
        picture: "https://www.medianauka.pl/biologia/grafika/ryby/dorsz.jpg",
        answers: [
            { text: 'Dorsz', correct: true }
        ]
    },
    {
        picture: "https://wedkuje.pl/foto_news/cropped/103139.jpg",
        answers: [
            { text: 'Miętus pospolity', correct: true }
        ]
    },
    {
        picture: "https://lh3.googleusercontent.com/proxy/PAVUr-S6CGYuKa50oJPNfz5O2_bnv5fgB5fH3lOzvixERVEx5CmO8nQ1yJmQ28QE2Dc8xUa51gRlXjdpsHgWbbIv7cZDpEb7j2Tb-2Vm78fXphY0Gg",
        answers: [
            { text: 'Plamiak', correct: true }
        ]
    },
    {
        picture: "https://bostonport.pl/wp-content/uploads/2017/04/15193606_160737021068555_1554591037794760768_n.png",
        answers: [
            { text: 'Gładzica', correct: true }
        ]
    },
    {
        picture: "https://atlasryb.online/zdjecia/1080_400.jpg",
        answers: [
            { text: 'Stornia', correct: true }
        ]
    },
    {
        picture: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Limanda_limanda.jpg",
        answers: [
            { text: 'Zimnica', correct: true }
        ]
    },
    {
        picture: "https://upload.wikimedia.org/wikipedia/commons/2/25/Scophthalmus_rhombus.jpg",
        answers: [
            { text: 'Nagład', correct: true }
        ]
    },
    {
        picture: "https://www.medianauka.pl/biologia/grafika/ryby/sola.jpg",
        answers: [
            { text: 'Sola', correct: true }
        ]
    },
    {
        picture: "https://akwa-mania.mud.pl/wp-content/uploads/2016/11/Acipenser-gueldenstaedtii.jpg",
        answers: [
            { text: 'Jesiotr rosyjski', correct: true }
        ]
    },
    {
        picture: "https://i.pinimg.com/originals/0b/5f/bc/0b5fbc46448d20ff03bdabd58058c389.jpg",
        answers: [
            { text: 'Sterlet', correct: true }
        ]
    },
    {
        picture: "https://atlasryb.online/zdjecia/4190_400.jpg",
        answers: [
            { text: 'Węgorz europejski', correct: true }
        ]
    },
    {
        picture: "https://rybyakwariowe.eu/galeria/ryby_zbrojnik_lamparci/thumbs/thumbs_zbrojnik-lamparci-glonojad-ryba-akwariowa-zbrojniki-lamparcie-7.jpg",
        answers: [
            { text: 'Zbrojnik lamparci', correct: true }
        ]
    },
    {
        picture: "https://www.radiomaryja.pl/wp-content/uploads/2020/08/sum.jpeg",
        answers: [
            { text: 'Sum pospolity', correct: true }
        ]
    },
    {
        picture: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Ameiurus_nebulosus.jpg",
        answers: [
            { text: 'Sumik karłowaty', correct: true }
        ]
    },
    {
        picture: "https://lh3.googleusercontent.com/proxy/sM5H9QB_xJSgPIaNZGXtbZWQpPeFU-7AQyE5KJaa98BcfrpomLJ4hLsiej0D5Mz1aMXPtOoCDlTL58gtP7Cg-aqxWvsPqbPCdf8Qbqb1ooIx",
        answers: [
            { text: 'Belona pospolita', correct: true }
        ]
    },
    {
        picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Chelidonichthys_lucernus_2_Luc_viatour.jpg/290px-Chelidonichthys_lucernus_2_Luc_viatour.jpg",
        answers: [
            { text: 'Kurek czerwony', correct: true }
        ]
    },
    {
        picture: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Cottus_poecilopus_Cifra_k%C3%B6l%C3%B6nte.jpg",
        answers: [
            { text: 'Głowacz białopłetwy', correct: true }
        ]
    },
    {
        picture: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Myoxocephalus_scorpius_PAQ.jpg",
        answers: [
            { text: 'Kur diabeł', correct: true }
        ]
    },
    {
        picture: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Myoxocephalus_thompsonii.jpg",
        answers: [
            { text: 'Kur rogacz', correct: true }
        ]
    },
    {
        picture: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Agonus_cataphractus.jpg",
        answers: [
            { text: 'Lisica', correct: true }
        ]
    },
    {
        picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkO7tSxqu5KwYsZ4pPlObhV_Bw3BnMSUDIPclwPXLDLCxAlXCTLjB3s6dNcd9Wxy-TR4c&usqp=CAU",
        answers: [
            { text: 'Tasza', correct: true }
        ]
    },
    {
        picture: "https://cdn.galleries.smcloud.net/t/galleries/gf-8ZLx-DBWi-Fp7m_szczupak-wartosc-odzywcza-zastosowanie-kulinarne-664x442-nocrop.jpg",
        answers: [
            { text: 'Szczupak', correct: true }
        ]
    },
    {
        picture: "https://fishing.pl/var/news/storage/images/media/fotki/ryby/kolen/80170-3-pol-PL/kolen.jpg",
        answers: [
            { text: 'Koleń pospolity', correct: true }
        ]
    },
    {
        picture: "https://www.medianauka.pl/biologia/grafika/ryby/minog-morski.jpg",
        answers: [
            { text: 'Minóg morski', correct: true }
        ]
    },
    {
        picture: "https://naukawpolsce.pap.pl/sites/default/files/styles/strona_glowna_slider_750x420/public/201710/21307578_21307562.jpg?itok=HF0pfyIa",
        answers: [
            { text: 'Minóg rzeczny', correct: true }
        ]
    },
    {
        picture: "https://www.medianauka.pl/biologia/grafika/ryby/minog-strumieniowy.jpg",
        answers: [
            { text: 'Minóg strumieniowy', correct: true }
        ]
    }
]

let questions = basicQuestions





