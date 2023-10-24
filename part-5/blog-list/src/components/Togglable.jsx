import { useState, forwardRef, useImperativeHandle } from "react"

const Togglable = forwardRef(({children, buttonLabel}, refs) => {
    const [visible, setVisible] = useState(false)


    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {toggleVisibility}
    })

    const showWhenVisible =  {display: visible ? '' : 'none'}
    const hideWhenVisible = {display: visible ? 'none' : ''}

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={() => {setVisible(true)}}>{buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <button onClick={() => {setVisible(false)}}>Cancel</button>
            </div>
        </div>
    )
})

export default Togglable