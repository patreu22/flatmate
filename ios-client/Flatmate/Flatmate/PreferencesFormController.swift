//
//  PreferencesFormController.swift
//  Flatmate
//
//  Created by Patrick on 24.09.17.
//  Copyright © 2017 Team Flatmate. All rights reserved.
//

import UIKit
import Stevia
import TPKeyboardAvoiding

class PreferencesFormController: UIViewController, UITextFieldDelegate {

    struct Actions {
        var didSelectStartSwiping: (String, String, String, String) -> Void = {_,_,_,_ in}
    }
    
    var actions = Actions()
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = .darkBlue
        layout()
    }

    private func layout(){
        let logoView = UIImageView()
        let descriptionText = UILabel()
        let formView = UIView()
        let minForm = FlatmateTextField()
        let maxForm = FlatmateTextField()
        let district = FlatmateTextField()
        let movedate = FlatmateTextField()
        let startBtn = UIButton(type: .custom)

        
        for tf in [minForm, maxForm, district, movedate] {
            tf.delegate = self
        }
        
        formView.sv(
            minForm.placeholder("min. Euro").style(Styles().formFieldStyle),
            maxForm.placeholder("max. Euro").style(Styles().formFieldStyle),
            district.placeholder("district").style(Styles().formFieldStyle),
            movedate.placeholder("move date").style(Styles().formFieldStyle)
        )
        
        formView.layout(
            0,
            |minForm.width(149).height(60) - "" - maxForm.width(149).height(60)|,
            14,
            |district.centerHorizontally().height(60)|,
            14,
            |movedate.centerHorizontally().height(60)|,
            0
        )
        
        
        self.view.sv(
            logoView.image("flatmate_bigLogo"),
            descriptionText.text("Tell us about your preferences so that we can fire up our algorithm.")
                .style(Styles().introTextStyle),
            formView,
            startBtn.style(Styles().startSwiping).text("Start Swiping")
        )
        
        self.view.layout(
            48,
            logoView.centerHorizontally(),
            14,
            |-36-descriptionText-36-|,
            44,
            |-36-formView-36-|,
            115,
            "",
            startBtn.height(53),
            40
        )
        
        startBtn.Left == formView.Left
        startBtn.Right == formView.Right
        
        startBtn.tap {
            guard let min = minForm.text else { return }
            guard let max = maxForm.text else { return }
            guard let kiez = district.text else { return }
            guard let moveIn = movedate.text else { return }
            self.actions.didSelectStartSwiping(min , max, kiez, moveIn)
        }
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        return true
    }

}
