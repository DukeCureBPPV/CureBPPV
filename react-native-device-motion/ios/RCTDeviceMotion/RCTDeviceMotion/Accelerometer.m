//
//  Accelerometer.m
//
//  Created by Keping Wang on 9/9/17.
//  Copyright © 2017 Keping Wang. All rights reserved.
//

#import "Accelerometer.h"
#import <React/RCTLog.h>

@implementation Accelerometer

RCT_EXPORT_MODULE();

- (id)init {
    self = [super init];
    if (self) {
        self->_motionManager = [[CMMotionManager alloc] init];
        if ([self->_motionManager isAccelerometerAvailable]) {
            NSLog(@"Accelerometer available");
            if ([self->_motionManager isAccelerometerActive] == NO) {
                NSLog(@"Accelerometer active");
            } else {
                NSLog(@"Accelerometer not active");
            }
        } else {
            NSLog(@"Accelerometer not available");
        }
    }
    return self;
}


- (NSArray<NSString *> *)supportedEvents {
    return @[@"Accelerometer"];
}

RCT_EXPORT_METHOD(setUpdateInterval:(double) interval) {
    NSLog(@"setUpdateInterval: %f", interval);
    double intervalInSeconds = interval / 1000;
    [self->_motionManager setAccelerometerUpdateInterval:intervalInSeconds];
}

RCT_EXPORT_METHOD(getUpdateInterval:(RCTResponseSenderBlock) cb) {
    double interval = self->_motionManager.accelerometerUpdateInterval;
    NSLog(@"geUpdateInterval: %f", interval);
    cb(@[[NSNull null], [NSNumber numberWithDouble:interval]]);
}

RCT_EXPORT_METHOD(getData:(RCTResponseSenderBlock) cb) {
    cb(@[
         [NSNull null],
         @{
             @"x": [NSNumber numberWithDouble:self->_motionManager.accelerometerData.acceleration.x],
             @"y": [NSNumber numberWithDouble:self->_motionManager.accelerometerData.acceleration.y],
             @"z": [NSNumber numberWithDouble:self->_motionManager.accelerometerData.acceleration.z],
             @"x": [NSNumber numberWithDouble:self->_motionManager.accelerometerData.timestamp]
             }]);
}

RCT_EXPORT_METHOD(startUpdates) {
    [self->_motionManager startAccelerometerUpdates];
    NSLog(@"Accelerometer updates started");
    [self->_motionManager startAccelerometerUpdatesToQueue:[NSOperationQueue mainQueue]
                                               withHandler:^(CMAccelerometerData *accelerometerData, NSError *error)
     {
         double x = accelerometerData.acceleration.x;
         double y = accelerometerData.acceleration.y;
         double z = accelerometerData.acceleration.z;
         double timestamp = accelerometerData.timestamp;
         [self
          sendEventWithName:@"Accelerometer"
          body:@{
                 @"x" : [NSNumber numberWithDouble:x],
                 @"y" : [NSNumber numberWithDouble:y],
                 @"z" : [NSNumber numberWithDouble:z],
                 @"timestamp" : [NSNumber numberWithDouble:timestamp]
                 }];
     }];
}

RCT_EXPORT_METHOD(stopUpdates) {
    NSLog(@"stopUpdates");
    [self->_motionManager stopAccelerometerUpdates];
}

@end
