//
//  Styles.swift
//  Flatmate
//
//  Created by Patrick on 24.09.17.
//  Copyright © 2017 Team Flatmate. All rights reserved.
//

import Foundation
import UIKit


class Styles{

    func additionalInfoStyle(l: UILabel){
        l.textColor = .grayTintColor
        l.font = UIFont(name: "CircularStd-Book", size: 18.0)
        l.numberOfLines = 1
    }
    
    func introTextStyle(l: UILabel){
        l.textColor = .white
        l.font = UIFont(name: "CircularStd-Book", size: 16)
        l.numberOfLines = 2
        l.textAlignment = .center
    }
    
    func formFieldStyle(t: UITextField){
        t.backgroundColor = UIColor.tfBackgroundColor
        t.textColor = .white
        t.height(60)
        t.returnKeyType = .done
    }
    
    func startSwiping(b: UIButton){
        b.backgroundColor = .white
        b.setTitleColor(UIColor.startSwipingColor, for: .normal)
        b.titleLabel?.font = UIFont(name: "CircularStd-Medium", size: 16.0)
        b.layer.cornerRadius = 5.0
    }
}
