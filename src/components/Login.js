import React, {useState} from 'react'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSbumit = (e) => {
        e.preventDefault()
        console.log("submitting")

        return
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Sign In</h5>
                            <form onSubmit={(e)=> handleSbumit(e)} className="form-signin">
                                <div className="form-label-group">
                                    <label forhtml="inputEmail">Email address</label>
                                    <input 
                                    value={email} 
                                    type="email" 
                                    onChange={(e)=> setEmail(e.target.value)}
                                    className="form-control" 
                                    placeholder="Email address" 
                                    required autoFocus />
                                </div>

                                <div className="form-label-group">
                                    <label forhtml="inputPassword">Password</label>
                                    <input 
                                    value={password} 
                                    type="password" 
                                    onChange={(e)=> setPassword(e.target.value)}
                                    id="inputPassword" 
                                    className="form-control" 
                                    placeholder="Password" 
                                    required /> 
                                </div>
                                <hr className="my-4"/>
                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
