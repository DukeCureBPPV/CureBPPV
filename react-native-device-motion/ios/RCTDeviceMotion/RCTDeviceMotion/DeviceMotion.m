//
//  DeviceMotion.m
//  RCTDeviceMotion
//
//  Created by Keping Wang on 9/11/17.
//  Copyright © 2017 Keping Wang. All rights reserved.
//

#import "DeviceMotion.h"

@implementation DeviceMotion

RCT_EXPORT_MODULE();

- (id)init
{
    self = [super init];
    if (self) {
        self->motion = [[CMMotionManager alloc] init];
        if (self->motion.isDeviceMotionAvailable) {
            self->motion.deviceMotionUpdateInterval = 1.0 / 60.0;
        }
    }
    return self;
}


- (NSArray<NSString *> *)supportedEvents {
    return @[@"Rotation"];
}

RCT_EXPORT_METHOD(setUpdateInterval:(double) interval) {
    if (!self->motion.isDeviceMotionAvailable) {
        return;
    }
    self->motion.deviceMotionUpdateInterval = interval / 1000.0;
}

RCT_EXPORT_METHOD(startUpdates) {
    if (!self->motion.isDeviceMotionAvailable) {
        return;
    }
    // self->motion.showsDeviceMovementDisplay = true;
    
    [self->motion startDeviceMotionUpdatesUsingReferenceFrame:CMAttitudeReferenceFrameXMagneticNorthZVertical toQueue:[NSOperationQueue mainQueue] withHandler:^(CMDeviceMotion *data, NSError *error)
     {
         [self
          sendEventWithName:@"Rotation"
          body:@{
                 @"x": [NSNumber numberWithDouble:data.attitude.quaternion.x],
                 @"y": [NSNumber numberWithDouble:data.attitude.quaternion.y],
                 @"z": [NSNumber numberWithDouble:data.attitude.quaternion.z],
                 @"w": [NSNumber numberWithDouble:data.attitude.quaternion.w],
                 @"roll": [NSNumber numberWithDouble:data.attitude.roll],
                 @"pitch": [NSNumber numberWithDouble:data.attitude.pitch],
                 @"yaw": [NSNumber numberWithDouble:data.attitude.yaw],
                 @"timestamp": [NSNumber numberWithDouble:data.timestamp]
                 }
          ];
     }];
}

RCT_EXPORT_METHOD(stopUpdates) {
    if (!self->motion.isDeviceMotionAvailable) {
        return;
    }
    [self->motion stopDeviceMotionUpdates];
}

@end

