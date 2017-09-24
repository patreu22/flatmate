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
import Stevia

class LoginViewController: UIViewController, LoginButtonDelegate {
    
    struct Actions {
        var didLoginSuccessfully: () -> Void = {}
    }
    
    var actions = Actions()
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = .darkBlue
        
        
        layout()
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
        actions.didLoginSuccessfully()
    }
    
    func loginButtonDidLogOut(_ loginButton: LoginButton) {
        print("Logged Out")
    }
    
    private func layout(){
        let loginButton = LoginButton(readPermissions: [ .publicProfile, .userFriends, .email, .custom("user_likes"),
                                                         .custom("user_location"), .custom("user_events"), .custom("user_events"),
                                                         .custom("user_about_me"),
                                                         .custom("user_location"),
                                                         .custom("user_work_history"),
                                                         .custom("user_hometown"),
                                                         .custom("user_education_history")])
        loginButton.delegate = self
        
        
        let introText = UILabel()
        let logoView = UIImageView()
        logoView.contentMode = .scaleAspectFit
        
        
        
        
        
        
        
        
        self.view.sv(logoView.image("flatmate_bigLogo"),
                     introText.text("Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.")
                            .style(Styles()
                            .introTextStyle),
                     loginButton
        )
        
        self.view.layout(
            150,
            logoView.centerHorizontally().height(120),
            50,
            |-36-introText-36-|,
            50,
            |-36-loginButton.centerHorizontally().height(53)-36-|,
            "",
            0
        )
    }

}
