import React, {useState , useContext ,useEffect} from "react";
import axios from "axios";

const table = {
    sports: 21,
    history: 23,
    politics: 24,
  }
const API_ENDPOINT = 'https://opentdb.com/api.php?'

const url = ''
const tempUrl ='https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
    const [waiting, setWaiting] = useState(true)
    const [loading, setLoading] = useState(false)
    const [questions, setQuestions] = useState([])
    const [index, setIndex] = useState(0)
    const [correct, setCorrect] = useState(0)
    const [error, setError] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [quiz , setQuiz] =useState({
        amount:10,
        category:'sport', 
        difficulty:'easy'
    })

    const fetchQuestion = async(url)=>{
        setWaiting(false)
        setLoading(true)
        const responde = await axios(url).catch((e)=>console.log(e))
console.log(responde)
        //if response is ture check the lenght//
     if(responde){
            const data = responde.data.results
            console.log(data)
            if(data.length> 0){
                setQuestions(data)
                setLoading(false)
                setWaiting(false)
                setError(false)
            }else{
             setWaiting(true)
             setError(true) 
            }

      }else{   //back to setup form if responde is not correct///
                   setWaiting(true)
           }
           }




const nextQuestion=()=>{
    setIndex((oldIndex)=>{
        const index= oldIndex +1
        if(index > questions.length -1){
            openModal()
            return 0
        }else{
            return index
        }

    })
    
    
  }
  const checkAnswer =(value)=>{
    if(value){
     setCorrect((oldState)=> oldState+1)
   }
       nextQuestion()
  }


  /*-------------modal----*/
  const openModal = ()=>{
      setIsModalOpen(true)
  }
  const closeModal = ()=>{
      setWaiting(true)
      setCorrect(0)
      setIsModalOpen(false)
}

/*------------form function---------------*/
const handelChange =(e)=>{
  const name = e.target.name
  const value = e.target.value
  console.log(name , value)

setQuiz({...quiz, [name]: value})
}

/*------we need to make new url to make question dynamic*/
const handelSubmit =( e) =>{
    e.preventDefault()
    const {amount, category, difficulty} = quiz
    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`
    //const tempUrl ='https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'

    fetchQuestion(url)
}
    return(
    <AppContext.Provider value={{ loading , waiting, questions, index, correct, error, isModalOpen ,
    nextQuestion ,checkAnswer , closeModal , quiz , handelChange , handelSubmit}}>
        {children}
    </AppContext.Provider>
)
}

export const useGlobalContext =()=>{
return useContext(AppContext)
}
export {AppContext , AppProvider}