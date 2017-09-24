//
//  AppCoordinator.swift
//  Flatmate
//
//  Created by Patrick on 23.09.17.
//  Copyright © 2017 Team Flatmate. All rights reserved.
//

import Foundation
import UIKit
import FacebookCore
import Moya
import SwiftyJSON

class AppCoordinator {
    
    private weak var window: UIWindow?
    private var navigationController: UINavigationController
    private var currentViewController: UIViewController?
    
    init(window: UIWindow?) {
        self.window = window
        self.navigationController = UINavigationController()
    }
    
    func start(){
        let tokenExisting = AccessToken.current != nil
        var vc = LoginViewController()

        vc.actions.didLoginSuccessfully = { [weak self] in
            print("Yo!")
            self?.showChoosePreferences()
        }
        
        currentViewController = vc
        navigationController = UINavigationController(rootViewController: vc)
        navigationController.setNavigationBarHidden(true, animated: false)
        window?.rootViewController = navigationController
        window?.makeKeyAndVisible()
        
        if tokenExisting{
            showChoosePreferences()
        }
    }

    private func showUserMainScreen(matches: JSON){
        let vc = MainSwipingViewController(matches: matches)
        pushAndMakeCurrent(vc)
    }
    
    private func showChoosePreferences(){
        let preferencesForm = PreferencesFormController()
        
        preferencesForm.actions.didSelectStartSwiping = { [weak self] min, max, district, moveDate in
            let provider = MoyaProvider<API>()
            provider.request(.demoRequest(facebookToken: AccessToken.current!.authenticationToken), completion: { (response) in
                print(response)
                switch response{
                case .success(_):
                    let json = JSON(data: response.value!.data)
                    let matches = json["matches"].array
                    print(json)
                    self?.showUserMainScreen(matches: json["matches"])
                    break
                default:
                    // TODO Change
                    break
                }
            })
        }
        
        self.pushAndMakeCurrent(preferencesForm)
    }
    
    private func pushAndMakeCurrent(_ viewController: UIViewController, animated: Bool = true) {
        currentViewController = viewController
        navigationController.pushViewController(viewController, animated: animated)
    }
    
    private func presentAndMakeCurrent(_ viewController: UIViewController, animated: Bool = true) {
        currentViewController = viewController
        navigationController.present(viewController, animated: animated, completion: nil)
    }
    
    private func popCurrent() {
        navigationController.popViewController(animated: true)
    }

}
