//
//  MainSwipingViewController.swift
//  Flatmate
//
//  Created by Patrick on 23.09.17.
//  Copyright © 2017 Team Flatmate. All rights reserved.
//

import UIKit
import Koloda
import Stevia
import SwiftyJSON


class MainSwipingViewController: UIViewController, KolodaViewDelegate, KolodaViewDataSource {
    let matches: JSON
    
    init(matches: JSON){
        self.matches = matches
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        layout()
        setGradientBackground()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func kolodaNumberOfCards(_ koloda: KolodaView) -> Int {
        return matches.array!.count
    }
    
    func kolodaSpeedThatCardShouldDrag(_ koloda: KolodaView) -> DragSpeed {
        return .moderate
    }
    
    func koloda(_ koloda: KolodaView, didSwipeCardAt index: Int, in direction: SwipeResultDirection){
        if direction == .right{
            let alert = UIAlertController(title: "It's a match!", message: "Contact your potential new flatmate now.", preferredStyle: .alert)
            let yes = UIAlertAction(title: "Ok", style: .default, handler: { (action) in
                // ...
            })
            let no = UIAlertAction(title: "Later", style: .destructive, handler: { (action) in
                // ...
            })
            alert.addAction(no)
            alert.addAction(yes)
            self.present(alert, animated: true, completion: nil)
        }
    }
    
    func koloda(_ koloda: KolodaView, viewForCardAt index: Int) -> UIView {
        let dataSet = matches.array![index]["roomId"]
        let nameStr = dataSet["username"].string!
        let descriptionStr = dataSet["description"].string!
        let priceStr = dataSet["price"].int!
        let roomSizeStr = dataSet["roomSize"].int!
        let districtStr = dataSet["district"].string!
        
        
        let colors: [UIColor] = [.blue, .green, .red, .brown, .yellow]
        let card = UIView()
        card.backgroundColor = .white
        card.layer.cornerRadius = 12.0
        
        let imageView = UIImageView(image: UIImage(named: "gang_placeholder"))
        imageView.layer.cornerRadius = 12.0
        imageView.layer.masksToBounds = true
        
        let firstTextArea = UIView()
        let name = UILabel()
        let plusX = UILabel()
        let place = UILabel()
        let price = UILabel()
        let sqm = UILabel()
        
        name.textColor = .darkTintColor
        name.font = UIFont(name: "CircularStd-Book", size: 20.0)
        
        
        firstTextArea.sv(
            name.text(nameStr),
            place.text("in \(districtStr)").style(Styles().additionalInfoStyle),
            price.text("\(priceStr)€").style(Styles().additionalInfoStyle),
            sqm.text("\(roomSizeStr)sqm").style(Styles().additionalInfoStyle),
            plusX.text("+\(arc4random_uniform(3)+1)").style(Styles().additionalInfoStyle)
        )
        
        firstTextArea.layout(
            17,
            |name-4 - plusX - "" - price|,
            2,
            |place - "" - sqm|,
            0
        )
        
        
        let secondTextArea = UILabel()
        secondTextArea.textColor = .grayTintColor
        secondTextArea.font = UIFont(name: "CircularStd-Book", size: 16.0)
        secondTextArea.numberOfLines = 0
        
        let separator = UIImageView(image: UIImage(named: "line"))
        
        imageView.contentMode = .scaleToFill
        
        card.sv(imageView,
                firstTextArea,
                secondTextArea.text("Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat."), 
                separator)
        card.layout(
            0,
            |imageView.height(276)|,
            |-25-firstTextArea-25-|,
            10,
            |-45-separator-45-|,
            10,
            |-25-secondTextArea-25-|,
            >=10
        )
        
        return card
    }
    
    
    private func layout(){
        self.view.backgroundColor = .darkBlue
        
        let topBar = getTopBar()
        
        let swipeStack = KolodaView()
        swipeStack.dataSource = self
        swipeStack.delegate = self
        
        self.view.sv(topBar, swipeStack)
        self.view.layout(
            17,
            |topBar.centerHorizontally()|,
            32,
            |-30-swipeStack-30-|,
            80
        )
    }
    
    private func getTopBar() -> UIView{
        let topBar = UIView()
        topBar.backgroundColor = .clear
        
        let chatButton = UIButton(type: .custom)
        chatButton.image("chat")
        
        let settingsButton = UIButton(type: .custom)
        settingsButton.image("settings")
        
        let logo = UIImageView(image: UIImage(named: "flatmate"))
        
        topBar.sv(chatButton, settingsButton, logo)
        topBar.layout(
            30,
            |-25-chatButton - "" - logo - "" - settingsButton-25-|,
            0
        )
    
        logo.centerHorizontally()
        
        return topBar
    }
    
    private func setGradientBackground() {
        let colorTop = UIColor.darkBlue.cgColor
        let colorBottom = UIColor.brightBlue.cgColor
        
        let gradient: CAGradientLayer = CAGradientLayer()
        gradient.colors = [colorTop, colorBottom]
        gradient.startPoint = CGPoint(x: 0.0, y: 0.0)
        gradient.endPoint = CGPoint(x: 1.0, y: 1.0)
        gradient.frame = CGRect(x: 0.0, y: 0.0, width: view.frame.size.width, height: view.frame.size.height)
        view.layer.insertSublayer(gradient, at: 0)
    }
}
