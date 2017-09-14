//
//  Accelerometer.h
//
//  Created by Keping Wang on 9/9/17.
//  Copyright © 2017 Keping Wang. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <CoreMotion/CoreMotion.h>

@interface Accelerometer : RCTEventEmitter <RCTBridgeModule> {
    CMMotionManager *_motionManager;
}
@end
