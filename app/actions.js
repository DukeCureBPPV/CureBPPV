
export const SET_TREATMENT_SIDE = 'app/set-treatment-side';
export const setTreatmentSide = treatmentSide => ({
  type: SET_TREATMENT_SIDE, treatmentSide,
});

export const MARK_INIT_QUATERNION = 'app/mark-init-quaternion';
export const markInitQuaternion = () => ({
  type: MARK_INIT_QUATERNION,
});

export const SET_QUATERNION = 'app/set-quaternion';
export const setQuaternion = (quaternion, timestamp) => ({
  type: SET_QUATERNION, quaternion, timestamp,
});
