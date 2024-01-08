import React, { useEffect, useState } from 'react'
import todo from '../image/todo.jpg'
import '../App.css'

// To get items from localStorage
const getLocalItems = () => {
    let list = localStorage.getItem('lists')
    // console.log(list);
    if (list) {
        return JSON.parse(localStorage.getItem('lists'))
    } else {
        return []
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState('')
    const [items, setItems] = useState(getLocalItems())
    const [toggleSubmit, setToggleSubmit] = useState(true)
    const [isEditItem, setIsEditItem] = useState(null)

    const addItem = () => {
        if (!inputData) {
            alert('Do not add empty data')
        } else if (inputData && !toggleSubmit) {
            setItems(items.map((elem) => {
                if (elem.id === isEditItem)
                    return { ...elem, name: inputData }
                return elem
            }))
            setToggleSubmit(true);
            setInputData('')
            setIsEditItem(null)
        }
        else {
            const allInputData = { id: new Date().getTime().toString(), name: inputData }
            setItems([...items, allInputData])
            setInputData('')
        }

    }

    const deleteItem = (index) => {
        const updateditems = items.filter((elem) => {
            return index !== elem.id
        })
        setItems(updateditems)
    }

    const removeAll = () => {
        setItems([])
    }

    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id
        })
        console.log(newEditItem);
        setToggleSubmit(false);
        setInputData(newEditItem.name)
        setIsEditItem(id)
    }

    // To set items in localStorage
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items])

    return (
        <>
            <div className="main_div">
                <div className="child_div">
                    <figure>
                        <img src={todo} alt="Todo Img" />
                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder='✍️ Add Items ...' value={inputData}
                            onChange={(e) => { setInputData(e.target.value) }} />
                        {toggleSubmit ? <i className="fa-solid fa-plus add_btn" title='Add Item' onClick={addItem}></i> :
                            <i className="fa-regular fa-pen-to-square add_btn" title='Updete Item' onClick={addItem}></i>}
                    </div>
                    <div className="showItems">
                        {items.map((elem) => {
                            return (
                                <div className="eachItem" key={elem.id}>
                                    <h3>{elem.name}</h3>
                                    <div className="todo_btn">
                                        <i className="fa-regular fa-pen-to-square add_btn" title='Edit Item'
                                            onClick={() => editItem(elem.id)}></i>
                                        <i className="fa-solid fa-trash-can add_btn" title='Delete Item'
                                            onClick={() => deleteItem(elem.id)}></i>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
                            <span>Remove All</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo