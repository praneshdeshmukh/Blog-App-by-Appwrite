import React, {useId} from 'react'

const Input = React.forwardRef(
    function Input({
        label,
        type = "text",
        // value,
        // onChange,
        className = "",
        ...props
    }, ref) {
        const id = useId()
        return (
            <div className='w-full'>
                {label && <label 
                className='inline-block mb-1 pl-1'
                htmlFor={id}>
                    {label}
                </label>
                }
                <input 
                    type={type}
                    className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full 
                        ${className}`}
                    ref={ref} // pass the ref which you've taken from user over here
                    // this thing will give you reference to your parent component
                    // that's why we used forward reference
                    // so that, even if the components are different however, 
                    // if we need reference from other component
                    // then refrence will be passed from the other component
                    // and now in our component we can acess the state
                    {...props}
                    id={id}
                    // now unique id is applied to both label and input
                    // so now, if someone clicks on label
                    // we'll be able to highlight(cursor pointed to) only that particular
                    // input to which it is linked to 
                    />
            </div>
        )
    }
)

export default Input