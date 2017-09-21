/* eslint-disable no-mixed-operators */
import RotationMatrix from './rotation-matrix';


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
   * Automatically converts to a unit quaternion.
   * @param {number} w 
   * @param {number} x 
   * @param {number} y 
   * @param {number} z 
   */
  constructor(w, x, y, z) {
    const norm = Math.sqrt(w * w + x * x + y * y + z * z);
    this.w = w / norm;
    this.x = x / norm;
    this.y = y / norm;
    this.z = z / norm;
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

  innerProduct(other) {
    const { w, x, y, z } = this;
    const o = other;
    return w * o.w + x * o.x + y * o.y + z * o.z;
  }

  distTo(other) {
    const innerProduct = this.innerProduct(other);
    return 1 - innerProduct * innerProduct;
  }

  /**
   * @returns {RotationMatrix}
   */
  toRotationMatrix() {
    const { w, x, y, z } = this;
    const m11 = 1 - 2 * y * y - 2 * z * z;
    const m12 = 2 * x * y - 2 * z * w;
    const m13 = 2 * x * z + 2 * y * w;
    const m21 = 2 * x * y + 2 * z * w;
    const m22 = 1 - 2 * x * x - 2 * z * z;
    const m23 = 2 * y * z - 2 * x * w;
    const m31 = 2 * x * z - 2 * y * w;
    const m32 = 2 * y * z + 2 * x * w;
    const m33 = 1 - 2 * x * x - 2 * y * y;
    return new RotationMatrix(m11, m12, m13, m21, m22, m23, m31, m32, m33);
  }


  /**
   * Converts to eulerian angles with the following standard:
   * http://www.euclideanspace.com/maths/standards/index.htm
   * 
   * Except that the output of x, y, z axes is {pitch, roll, yaw}.
   * @returns {{pitch: number, roll: number, yaw: number}}
   */
  toEulerianAngle() {
    const { w, x, y, z } = this;

    let heading; // y axis
    let attitude; // z axis
    let bank; // x axis
    const test = x * y + z * w;
    if (test > 0.499) { // singularity at north pole
      heading = 2 * Math.atan2(x, w);
      attitude = Math.PI / 2;
      bank = 0;
    } else if (test < -0.499) { // singularity at south pole
      heading = -2 * Math.atan2(x, w);
      attitude = -Math.PI / 2;
      bank = 0;
    } else {
      const sqx = x * x;
      const sqy = y * y;
      const sqz = z * z;
      heading = Math.atan2(2 * y * w - 2 * x * z, 1 - 2 * sqy - 2 * sqz);
      attitude = Math.asin(2 * test);
      bank = Math.atan2(2 * x * w - 2 * y * z, 1 - 2 * sqx - 2 * sqz);
    }

    const pitch = bank;
    const roll = heading;
    const yaw = attitude;

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
