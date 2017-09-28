/* eslint-disable no-mixed-operators */
import Quaternion from './quaternion';

class Vector3D {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Returns the quaternion representation of this 3D vector,
   * with the scalar part being 0.
   * @returns {Quaternion}
   */
  toQuaternion() {
    const { x, y, z } = this;
    return new Quaternion(0, x, y, z);
  }

  /**
   * Apply the quaternion rotation to the 3D vector,
   * return the rotated vector.
   * @param {Quaternion} q
   * @returns {Vector3D}
   */
  rotate(q) {
    const { x, y, z } = this;
    const len = Math.sqrt(x * x + y * y + z * z);
    const resQ = q.times(this.toQuaternion()).times(q.inv());
    return resQ.getVector().getVectorWithLength(len);
  }

  getVectorWithLength(targetLen) {
    const { x, y, z } = this;
    const factor = targetLen / Math.sqrt(x * x + y * y + z * z);
    return new Vector3D(x * factor, y * factor, z * factor);
  }

  getAngle2D() {
    const { x, y } = this;
    return Math.atan2(y, x);
  }

  toString() {
    const { x, y, z } = this;
    return `x: ${x}; y: ${y}; z: ${z}`;
  }
}

export default Vector3D;
