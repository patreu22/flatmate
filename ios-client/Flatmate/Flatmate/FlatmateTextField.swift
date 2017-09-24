//
//  FlatmateTextField.swift
//  Flatmate
//
//  Created by Patrick on 24.09.17.
//  Copyright © 2017 Team Flatmate. All rights reserved.
//

import UIKit

class FlatmateTextField: UITextField {
    
    let padding = UIEdgeInsets(top: 17.0, left: 30.0, bottom: 20.0, right: 10.0)
    
    override func textRect(forBounds bounds: CGRect) -> CGRect {
        return UIEdgeInsetsInsetRect(bounds, padding)
    }
    
    override func editingRect(forBounds bounds: CGRect) -> CGRect {
        return UIEdgeInsetsInsetRect(bounds, padding)
    }
    
    override func placeholderRect(forBounds pbounds: CGRect) -> CGRect {
        return UIEdgeInsetsInsetRect(bounds, padding)
    }

}
