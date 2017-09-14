//
//  DeviceMotion.h
//  RCTDeviceMotion
//
//  Created by Keping Wang on 9/11/17.
//  Copyright © 2017 Keping Wang. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <CoreMotion/CoreMotion.h>


@interface DeviceMotion : RCTEventEmitter <RCTBridgeModule> {
    CMMotionManager * motion;
}
@end

