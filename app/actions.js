
export const SET_TREATMENT_SIDE = 'app/set-treatment-side';
export const setTreatmentSide = treatmentSide => ({
  type: SET_TREATMENT_SIDE, treatmentSide,
});

export const SET_INIT_QUATERNION = 'app/set-init-quaternion';
export const setInitQuaternion = quaternion => ({
  type: SET_INIT_QUATERNION, quaternion,
});
