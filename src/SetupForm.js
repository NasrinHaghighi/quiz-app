import React from 'react'
import { useGlobalContext } from './context'

const SetupForm =()=> {
    const {quiz , handelChange , handelSubmit, error} = useGlobalContext();
   
    return (
        <section className='quiz quiz-small'>
            <form  className='setup-form'>
            <h2>setup quiz</h2>
              {/* amount */}
                <div className='form-control'>
                    <label htmlFor='amount'>number of questions</label>
                    <input type="number" name='amount' value={quiz.amount} id='amount' onChange={handelChange} min={1} max={50}  className='form-input'/>
                </div>
                 {/* category */}
          <div className='form-control'>
            <label htmlFor='category'>category</label>
            <select   name='category' id='category'   className='form-input'   value={quiz.category}        onChange={handelChange}     >
              <option value='sports'>sports</option>
              <option value='history'>history</option>
              <option value='politics'>politics</option>
            </select>
          </div>
          {/* difficulty */}
          <div className='form-control'>
            <label htmlFor='difficulty'>select difficulty</label>
            <select  name='difficulty'  id='difficulty'   className='form-input'  value={quiz.difficulty}  onChange={handelChange}   >
              <option value='easy'>easy</option>
              <option value='medium'>medium</option>
              <option value='hard'>hard</option>
            </select>
          </div>
          {error && <p className='error'> can not generate the questions</p>}
          <button type='submit' onClick={handelSubmit} className='submit-btn'> start </button>
            </form>
          
        </section>
    )
}

export default SetupForm
