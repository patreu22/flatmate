//
//  API.swift
//  Flatmate
//
//  Created by Patrick on 23.09.17.
//  Copyright © 2017 Team Flatmate. All rights reserved.
//

import Foundation
import Moya

enum API {
    case demoRequest(facebookToken: String)
    case demoRoom(facebookToken: String)
    
}

extension API: TargetType {
    
    var baseURL: URL {
        return URL(string: "http://172.16.2.104:3000")!
    }
    
    var headers: [String : String]? {
        return ["Content-type": "application/json"]
    }

    var path: String{
        switch self{
        case .demoRequest(_):
            return "/demoRequest/"
        case .demoRoom(_):
            return "/demoRoom/"
        }
        
    }
    
    var method: Moya.Method {
        switch self {
        case .demoRequest, .demoRoom:
            return .post
        }
    }
    
    var task: Task {
        switch self {
        case .demoRequest(let facebookToken), .demoRoom(let facebookToken):
            return .requestParameters(parameters: ["facebookToken": facebookToken], encoding: JSONEncoding.default)
        }
    }
    
    var sampleData: Data {
        switch self {
        case .demoRequest(let facebookToken), .demoRoom(let facebookToken):
            return "{\"facebookToken: \(facebookToken)\"}".data(using: .utf8)!
        }
    }
}
