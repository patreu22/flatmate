//
//  AppCoordinator.swift
//  Flatmate
//
//  Created by Patrick on 23.09.17.
//  Copyright © 2017 Team Flatmate. All rights reserved.
//

import Foundation
import UIKit

class AppCoordinator {
    
    private weak var window: UIWindow?
    private var navigationController: UINavigationController
    private var currentViewController: UIViewController?
    
    init(window: UIWindow?, navigationController: UINavigationController) {
        self.window = window
        self.navigationController = navigationController
    }
    
    func start(){
        let vc = LoginViewController()
        currentViewController = vc
        navigationController = UINavigationController(rootViewController: vc)
        window?.rootViewController = navigationController
        window?.makeKeyAndVisible()
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
