/* eslint-disable no-mixed-operators */

/**
 * Quaternion is a mathematical way for represnting orientations and rotations,
 * represented by (w + x\*i + y\*j + z\*k). This class specifically represents
 * a unit quaternion (norm one).
 * 
 * A unit quaternion represents a rotation of theta
 * radians about the unit vector (ux, uy, uz).
 * 
 * Quaternion can be represented using an extension of Euler's formula:
 * 
 * q = exp( (ux\*i + uy\*j + uz\*k) \* theta/2 )
 * 
 *   = cos(theta/2) + (ux\*i + uy\*j + uz\*k) sin\*(theta/2)
 * 
 *   = w + x\*i + y\*j + z\*k
 * 
 * https://en.wikipedia.org/wiki/Quaternions_and_spatial_rotation
 */
class Quaternion {
  /**
   * A quaternion of (w + x*i + y*j + z*k).
   * @param {number} w 
   * @param {number} x 
   * @param {number} y 
   * @param {number} z 
   */
  constructor(w, x, y, z) {
    this.w = w;
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Returns the hamilton product of two quaternions,
   * applying one rotation to the other.
   * https://en.wikipedia.org/wiki/Quaternion#Hamilton_product
   * @param {Quaternion} other 
   * @returns {Quaternion}
   */
  times(other) {
    const a1 = this.w;
    const b1 = this.x;
    const c1 = this.y;
    const d1 = this.z;
    const a2 = other.w;
    const b2 = other.x;
    const c2 = other.y;
    const d2 = other.z;

    return new Quaternion(
      a1 * a2 - b1 * b2 - c1 * c2 - d1 * d2,
      a1 * b2 + b1 * a2 + c1 * d2 - d1 * c2,
      a1 * c2 - b1 * d2 + c1 * a2 + d1 * b2,
      a1 * d2 + b1 * c2 - c1 * b2 + d1 * a2,
    );
  }

  /**
   * Returns the inverse of this quaternion.
   * @returns {Quaternion}
   */
  inv() {
    return new Quaternion(this.w, -this.x, -this.y, -this.z);
  }

  /**
   * Returns the equivalent eulerian angle representation of { pitch, roll, yaw }.
   * Assume that the eulerian angles use right hand coordinates,
   * right hand rotation, and ZYX order.
   * @returns {{pitch: number, roll: number, yaw: number}}}
   */
  toEulerianAngle() {
    const { w, x, y, z } = this;

    // returns {pitch, roll, yaw} in radius
    const t0 = 2.0 * ((w * x) + (y * z));
    const t1 = 1.0 - (2.0 * ((x * x) + (y * y)));
    const pitch = Math.atan2(t0, t1); // X pitch

    let t2 = 2.0 * ((w * y) - (z * x));
    if (t2 > 1) {
      t2 = 1;
    }
    if (t2 < -1) {
      t2 = -1;
    }
    const roll = Math.asin(t2); // Y roll

    const t3 = 2.0 * ((w * z) + (x * y));
    const t4 = 1.0 - (2.0 * ((y * y) + (z * z)));
    const yaw = Math.atan2(t3, t4); // Z yaw

    return { pitch, roll, yaw };
  }

  toString() {
    const { w, x, y, z } = this;
    const n = num => (
      num < 0
        ? num.toFixed(3)
        : ` ${num.toFixed(3)}`
    );
    return `w: ${n(w)}, x: ${n(x)}, y: ${n(y)}, z: ${n(z)}\n`;
  }
}

export default Quaternion;
