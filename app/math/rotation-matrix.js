/* eslint-disable no-mixed-operators */
import Quaternion from './quaternion';

class RotationMatrix {
  constructor(m11, m12, m13, m21, m22, m23, m31, m32, m33) {
    this.m11 = m11;
    this.m12 = m12;
    this.m13 = m13;
    this.m21 = m21;
    this.m22 = m22;
    this.m23 = m23;
    this.m31 = m31;
    this.m32 = m32;
    this.m33 = m33;
  }

  /**
   * http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/
   * C++ Code.
   */
  toQuaternion() {
    const { m11, m12, m13, m21, m22, m23, m31, m32, m33 } = this;
    const trace = m11 + m22 + m33;
    let w;
    let x;
    let y;
    let z;
    let s;
    if (trace > 0) {
      s = 0.5 / Math.sqrt(trace + 1);
      w = 0.25 / s;
      x = (m32 - m23) * s;
      y = (m13 - m31) * s;
      z = (m21 - m12) * s;
    } else if (m11 > m22 && m11 > m33) {
      s = 2 * Math.sqrt(1 + m11 - m22 - m33);
      w = (m32 - m23) / s;
      x = 0.25 * s;
      y = (m12 + m21) / s;
      z = (m13 + m31) / s;
    } else if (m22 > m33) {
      s = 2 * Math.sqrt(1 + m22 - m11 - m33);
      w = (m13 - m31) / s;
      x = (m12 + m21) / s;
      y = 0.25 * s;
      z = (m23 + m32) / s;
    } else {
      s = 2 * Math.sqrt(1 + m33 - m11 - m22);
      w = (m21 - m12) / s;
      x = (m13 + m31) / s;
      y = (m23 + m32) / s;
      z = 0.25 * s;
    }
    return new Quaternion(w, x, y, z);
  }

  det() {
    const { m11, m12, m13, m21, m22, m23, m31, m32, m33 } = this;
    let ans = 0;
    ans += m11 * (m22 * m33 - m23 * m32);
    ans += -m12 * (m21 * m33 - m23 * m31);
    ans += m13 * (m21 * m32 - m22 * m31);
    return ans;
  }

  inv() {
    const { m11, m12, m13, m21, m22, m23, m31, m32, m33 } = this;
    const A = this.det();
    const n11 = m22 * m33 - m23 * m32;
    const n12 = m13 * m32 - m12 * m33;
    const n13 = m12 * m23 - m13 * m22;
    const n21 = m23 * m31 - m21 * m33;
    const n22 = m11 * m33 - m13 * m31;
    const n23 = m13 * m21 - m11 * m23;
    const n31 = m21 * m32 - m22 * m31;
    const n32 = m12 * m31 - m11 * m32;
    const n33 = m11 * m22 - m12 * m21;
    return new RotationMatrix(
      n11 / A, n12 / A, n13 / A,
      n21 / A, n22 / A, n23 / A,
      n31 / A, n32 / A, n33 / A,
    );
  }

  T() {
    const { m11, m12, m13, m21, m22, m23, m31, m32, m33 } = this;
    return new RotationMatrix(
      m11, m21, m31,
      m12, m22, m32,
      m13, m23, m33,
    );
  }

  times(other) {
    const { m11, m12, m13, m21, m22, m23, m31, m32, m33 } = this;
    const o = other;
    const n11 = m11 * o.m11 + m12 * o.m21 + m13 * o.m31;
    const n12 = m11 * o.m12 + m12 * o.m22 + m13 * o.m32;
    const n13 = m11 * o.m13 + m12 * o.m23 + m13 * o.m33;
    const n21 = m21 * o.m11 + m22 * o.m21 + m23 * o.m31;
    const n22 = m21 * o.m12 + m22 * o.m22 + m23 * o.m32;
    const n23 = m21 * o.m13 + m22 * o.m23 + m23 * o.m33;
    const n31 = m31 * o.m11 + m32 * o.m21 + m33 * o.m31;
    const n32 = m31 * o.m12 + m32 * o.m22 + m33 * o.m32;
    const n33 = m31 * o.m13 + m32 * o.m23 + m33 * o.m33;
    return new RotationMatrix(
      n11, n12, n13,
      n21, n22, n23,
      n31, n32, n33,
    );
  }

  toString() {
    const { m11, m12, m13, m21, m22, m23, m31, m32, m33 } = this;
    const n = num => (
      num < 0
        ? num.toFixed(2)
        : ` ${num.toFixed(2)}`
    );
    return ''
      + `${n(m11)}, ${n(m12)}, ${n(m13)}\n`
      + `${n(m21)}, ${n(m22)}, ${n(m23)}\n`
      + `${n(m31)}, ${n(m32)}, ${n(m33)}\n`;
  }
}

export default RotationMatrix;
