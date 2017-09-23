//
//  LoginViewController.swift
//  Flatmate
//
//  Created by Patrick on 23.09.17.
//  Copyright © 2017 Team Flatmate. All rights reserved.
//

import UIKit
import FacebookLogin
import FacebookCore

class LoginViewController: UIViewController, LoginButtonDelegate {
    
    struct Actions {
        var didLoginSuccessfully: () -> Void = {}
    }
    
    var actions = Actions()
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = .white
        
        
        let loginButton = LoginButton(readPermissions: [ .publicProfile, .userFriends, .email, .custom("user_likes"),
                                                         .custom("user_location"), .custom("user_events"), .custom("user_events"),
                                                         .custom("user_about_me") ])
        loginButton.center = view.center
        loginButton.delegate = self
        
        view.addSubview(loginButton)
        
    
        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func loginButtonDidCompleteLogin(_ loginButton: LoginButton, result: LoginResult) {
        print("Login finished")
        if let accessToken = AccessToken.current {
            print("Access Token: \(accessToken)")
        }
    }
    
    func loginButtonDidLogOut(_ loginButton: LoginButton) {
        print("Logged Out")
    }

}
