/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.webgl' {
    export = goog.webgl;
}

declare namespace goog.webgl {
    /**
     * @const
     * @type {number}
     */
    const DEPTH_BUFFER_BIT: number;

    /**
     * @const
     * @type {number}
     */
    const STENCIL_BUFFER_BIT: number;

    /**
     * @const
     * @type {number}
     */
    const COLOR_BUFFER_BIT: number;

    /**
     * @const
     * @type {number}
     */
    const POINTS: number;

    /**
     * @const
     * @type {number}
     */
    const LINES: number;

    /**
     * @const
     * @type {number}
     */
    const LINE_LOOP: number;

    /**
     * @const
     * @type {number}
     */
    const LINE_STRIP: number;

    /**
     * @const
     * @type {number}
     */
    const TRIANGLES: number;

    /**
     * @const
     * @type {number}
     */
    const TRIANGLE_STRIP: number;

    /**
     * @const
     * @type {number}
     */
    const TRIANGLE_FAN: number;

    /**
     * @const
     * @type {number}
     */
    const ZERO: number;

    /**
     * @const
     * @type {number}
     */
    const ONE: number;

    /**
     * @const
     * @type {number}
     */
    const SRC_COLOR: number;

    /**
     * @const
     * @type {number}
     */
    const ONE_MINUS_SRC_COLOR: number;

    /**
     * @const
     * @type {number}
     */
    const SRC_ALPHA: number;

    /**
     * @const
     * @type {number}
     */
    const ONE_MINUS_SRC_ALPHA: number;

    /**
     * @const
     * @type {number}
     */
    const DST_ALPHA: number;

    /**
     * @const
     * @type {number}
     */
    const ONE_MINUS_DST_ALPHA: number;

    /**
     * @const
     * @type {number}
     */
    const DST_COLOR: number;

    /**
     * @const
     * @type {number}
     */
    const ONE_MINUS_DST_COLOR: number;

    /**
     * @const
     * @type {number}
     */
    const SRC_ALPHA_SATURATE: number;

    /**
     * @const
     * @type {number}
     */
    const FUNC_ADD: number;

    /**
     * @const
     * @type {number}
     */
    const BLEND_EQUATION: number;

    /**
     * Same as BLEND_EQUATION
     * @const
     * @type {number}
     */
    const BLEND_EQUATION_RGB: number;

    /**
     * @const
     * @type {number}
     */
    const BLEND_EQUATION_ALPHA: number;

    /**
     * @const
     * @type {number}
     */
    const FUNC_SUBTRACT: number;

    /**
     * @const
     * @type {number}
     */
    const FUNC_REVERSE_SUBTRACT: number;

    /**
     * @const
     * @type {number}
     */
    const BLEND_DST_RGB: number;

    /**
     * @const
     * @type {number}
     */
    const BLEND_SRC_RGB: number;

    /**
     * @const
     * @type {number}
     */
    const BLEND_DST_ALPHA: number;

    /**
     * @const
     * @type {number}
     */
    const BLEND_SRC_ALPHA: number;

    /**
     * @const
     * @type {number}
     */
    const CONSTANT_COLOR: number;

    /**
     * @const
     * @type {number}
     */
    const ONE_MINUS_CONSTANT_COLOR: number;

    /**
     * @const
     * @type {number}
     */
    const CONSTANT_ALPHA: number;

    /**
     * @const
     * @type {number}
     */
    const ONE_MINUS_CONSTANT_ALPHA: number;

    /**
     * @const
     * @type {number}
     */
    const BLEND_COLOR: number;

    /**
     * @const
     * @type {number}
     */
    const ARRAY_BUFFER: number;

    /**
     * @const
     * @type {number}
     */
    const ELEMENT_ARRAY_BUFFER: number;

    /**
     * @const
     * @type {number}
     */
    const ARRAY_BUFFER_BINDING: number;

    /**
     * @const
     * @type {number}
     */
    const ELEMENT_ARRAY_BUFFER_BINDING: number;

    /**
     * @const
     * @type {number}
     */
    const STREAM_DRAW: number;

    /**
     * @const
     * @type {number}
     */
    const STATIC_DRAW: number;

    /**
     * @const
     * @type {number}
     */
    const DYNAMIC_DRAW: number;

    /**
     * @const
     * @type {number}
     */
    const BUFFER_SIZE: number;

    /**
     * @const
     * @type {number}
     */
    const BUFFER_USAGE: number;

    /**
     * @const
     * @type {number}
     */
    const CURRENT_VERTEX_ATTRIB: number;

    /**
     * @const
     * @type {number}
     */
    const FRONT: number;

    /**
     * @const
     * @type {number}
     */
    const BACK: number;

    /**
     * @const
     * @type {number}
     */
    const FRONT_AND_BACK: number;

    /**
     * @const
     * @type {number}
     */
    const CULL_FACE: number;

    /**
     * @const
     * @type {number}
     */
    const BLEND: number;

    /**
     * @const
     * @type {number}
     */
    const DITHER: number;

    /**
     * @const
     * @type {number}
     */
    const STENCIL_TEST: number;

    /**
     * @const
     * @type {number}
     */
    const DEPTH_TEST: number;

    /**
     * @const
     * @type {number}
     */
    const SCISSOR_TEST: number;

    /**
     * @const
     * @type {number}
     */
    const POLYGON_OFFSET_FILL: number;

    /**
     * @const
     * @type {number}
     */
    const SAMPLE_ALPHA_TO_COVERAGE: number;

    /**
     * @const
     * @type {number}
     */
    const SAMPLE_COVERAGE: number;

    /**
     * @const
     * @type {number}
     */
    const NO_ERROR: number;

    /**
     * @const
     * @type {number}
     */
    const INVALID_ENUM: number;

    /**
     * @const
     * @type {number}
     */
    const INVALID_VALUE: number;

    /**
     * @const
     * @type {number}
     */
    const INVALID_OPERATION: number;

    /**
     * @const
     * @type {number}
     */
    const OUT_OF_MEMORY: number;

    /**
     * @const
     * @type {number}
     */
    const CW: number;

    /**
     * @const
     * @type {number}
     */
    const CCW: number;

    /**
     * @const
     * @type {number}
     */
    const LINE_WIDTH: number;

    /**
     * @const
     * @type {number}
     */
    const ALIASED_POINT_SIZE_RANGE: number;

    /**
     * @const
     * @type {number}
     */
    const ALIASED_LINE_WIDTH_RANGE: number;

    /**
     * @const
     * @type {number}
     */
    const CULL_FACE_MODE: number;

    /**
     * @const
     * @type {number}
     */
    const FRONT_FACE: number;

    /**
     * @const
     * @type {number}
     */
    const DEPTH_RANGE: number;

    /**
     * @const
     * @type {number}
     */
    const DEPTH_WRITEMASK: number;

    /**
     * @const
     * @type {number}
     */
    const DEPTH_CLEAR_VALUE: number;

    /**
     * @const
     * @type {number}
     */
    const DEPTH_FUNC: number;

    /**
     * @const
     * @type {number}
     */
    const STENCIL_CLEAR_VALUE: number;

    /**
     * @const
     * @type {number}
     */
    const STENCIL_FUNC: number;

    /**
     * @const
     * @type {number}
     */
    const STENCIL_FAIL: number;

    /**
     * @const
     * @type {number}
     */
    const STENCIL_PASS_DEPTH_FAIL: number;

    /**
     * @const
     * @type {number}
     */
    const STENCIL_PASS_DEPTH_PASS: number;

    /**
     * @const
     * @type {number}
     */
    const STENCIL_REF: number;

    /**
     * @const
     * @type {number}
     */
    const STENCIL_VALUE_MASK: number;

    /**
     * @const
     * @type {number}
     */
    const STENCIL_WRITEMASK: number;

    /**
     * @const
     * @type {number}
     */
    const STENCIL_BACK_FUNC: number;

    /**
     * @const
     * @type {number}
     */
    const STENCIL_BACK_FAIL: number;

    /**
     * @const
     * @type {number}
     */
    const STENCIL_BACK_PASS_DEPTH_FAIL: number;

    /**
     * @const
     * @type {number}
     */
    const STENCIL_BACK_PASS_DEPTH_PASS: number;

    /**
     * @const
     * @type {number}
     */
    const STENCIL_BACK_REF: number;

    /**
     * @const
     * @type {number}
     */
    const STENCIL_BACK_VALUE_MASK: number;

    /**
     * @const
     * @type {number}
     */
    const STENCIL_BACK_WRITEMASK: number;

    /**
     * @const
     * @type {number}
     */
    const VIEWPORT: number;

    /**
     * @const
     * @type {number}
     */
    const SCISSOR_BOX: number;

    /**
     * @const
     * @type {number}
     */
    const COLOR_CLEAR_VALUE: number;

    /**
     * @const
     * @type {number}
     */
    const COLOR_WRITEMASK: number;

    /**
     * @const
     * @type {number}
     */
    const UNPACK_ALIGNMENT: number;

    /**
     * @const
     * @type {number}
     */
    const PACK_ALIGNMENT: number;

    /**
     * @const
     * @type {number}
     */
    const MAX_TEXTURE_SIZE: number;

    /**
     * @const
     * @type {number}
     */
    const MAX_VIEWPORT_DIMS: number;

    /**
     * @const
     * @type {number}
     */
    const SUBPIXEL_BITS: number;

    /**
     * @const
     * @type {number}
     */
    const RED_BITS: number;

    /**
     * @const
     * @type {number}
     */
    const GREEN_BITS: number;

    /**
     * @const
     * @type {number}
     */
    const BLUE_BITS: number;

    /**
     * @const
     * @type {number}
     */
    const ALPHA_BITS: number;

    /**
     * @const
     * @type {number}
     */
    const DEPTH_BITS: number;

    /**
     * @const
     * @type {number}
     */
    const STENCIL_BITS: number;

    /**
     * @const
     * @type {number}
     */
    const POLYGON_OFFSET_UNITS: number;

    /**
     * @const
     * @type {number}
     */
    const POLYGON_OFFSET_FACTOR: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE_BINDING_2D: number;

    /**
     * @const
     * @type {number}
     */
    const SAMPLE_BUFFERS: number;

    /**
     * @const
     * @type {number}
     */
    const SAMPLES: number;

    /**
     * @const
     * @type {number}
     */
    const SAMPLE_COVERAGE_VALUE: number;

    /**
     * @const
     * @type {number}
     */
    const SAMPLE_COVERAGE_INVERT: number;

    /**
     * @const
     * @type {number}
     */
    const COMPRESSED_TEXTURE_FORMATS: number;

    /**
     * @const
     * @type {number}
     */
    const DONT_CARE: number;

    /**
     * @const
     * @type {number}
     */
    const FASTEST: number;

    /**
     * @const
     * @type {number}
     */
    const NICEST: number;

    /**
     * @const
     * @type {number}
     */
    const GENERATE_MIPMAP_HINT: number;

    /**
     * @const
     * @type {number}
     */
    const BYTE: number;

    /**
     * @const
     * @type {number}
     */
    const UNSIGNED_BYTE: number;

    /**
     * @const
     * @type {number}
     */
    const SHORT: number;

    /**
     * @const
     * @type {number}
     */
    const UNSIGNED_SHORT: number;

    /**
     * @const
     * @type {number}
     */
    const INT: number;

    /**
     * @const
     * @type {number}
     */
    const UNSIGNED_INT: number;

    /**
     * @const
     * @type {number}
     */
    const FLOAT: number;

    /**
     * @const
     * @type {number}
     */
    const DEPTH_COMPONENT: number;

    /**
     * @const
     * @type {number}
     */
    const ALPHA: number;

    /**
     * @const
     * @type {number}
     */
    const RGB: number;

    /**
     * @const
     * @type {number}
     */
    const RGBA: number;

    /**
     * @const
     * @type {number}
     */
    const LUMINANCE: number;

    /**
     * @const
     * @type {number}
     */
    const LUMINANCE_ALPHA: number;

    /**
     * @const
     * @type {number}
     */
    const UNSIGNED_SHORT_4_4_4_4: number;

    /**
     * @const
     * @type {number}
     */
    const UNSIGNED_SHORT_5_5_5_1: number;

    /**
     * @const
     * @type {number}
     */
    const UNSIGNED_SHORT_5_6_5: number;

    /**
     * @const
     * @type {number}
     */
    const FRAGMENT_SHADER: number;

    /**
     * @const
     * @type {number}
     */
    const VERTEX_SHADER: number;

    /**
     * @const
     * @type {number}
     */
    const MAX_VERTEX_ATTRIBS: number;

    /**
     * @const
     * @type {number}
     */
    const MAX_VERTEX_UNIFORM_VECTORS: number;

    /**
     * @const
     * @type {number}
     */
    const MAX_VARYING_VECTORS: number;

    /**
     * @const
     * @type {number}
     */
    const MAX_COMBINED_TEXTURE_IMAGE_UNITS: number;

    /**
     * @const
     * @type {number}
     */
    const MAX_VERTEX_TEXTURE_IMAGE_UNITS: number;

    /**
     * @const
     * @type {number}
     */
    const MAX_TEXTURE_IMAGE_UNITS: number;

    /**
     * @const
     * @type {number}
     */
    const MAX_FRAGMENT_UNIFORM_VECTORS: number;

    /**
     * @const
     * @type {number}
     */
    const SHADER_TYPE: number;

    /**
     * @const
     * @type {number}
     */
    const DELETE_STATUS: number;

    /**
     * @const
     * @type {number}
     */
    const LINK_STATUS: number;

    /**
     * @const
     * @type {number}
     */
    const VALIDATE_STATUS: number;

    /**
     * @const
     * @type {number}
     */
    const ATTACHED_SHADERS: number;

    /**
     * @const
     * @type {number}
     */
    const ACTIVE_UNIFORMS: number;

    /**
     * @const
     * @type {number}
     */
    const ACTIVE_ATTRIBUTES: number;

    /**
     * @const
     * @type {number}
     */
    const SHADING_LANGUAGE_VERSION: number;

    /**
     * @const
     * @type {number}
     */
    const CURRENT_PROGRAM: number;

    /**
     * @const
     * @type {number}
     */
    const NEVER: number;

    /**
     * @const
     * @type {number}
     */
    const LESS: number;

    /**
     * @const
     * @type {number}
     */
    const EQUAL: number;

    /**
     * @const
     * @type {number}
     */
    const LEQUAL: number;

    /**
     * @const
     * @type {number}
     */
    const GREATER: number;

    /**
     * @const
     * @type {number}
     */
    const NOTEQUAL: number;

    /**
     * @const
     * @type {number}
     */
    const GEQUAL: number;

    /**
     * @const
     * @type {number}
     */
    const ALWAYS: number;

    /**
     * @const
     * @type {number}
     */
    const KEEP: number;

    /**
     * @const
     * @type {number}
     */
    const REPLACE: number;

    /**
     * @const
     * @type {number}
     */
    const INCR: number;

    /**
     * @const
     * @type {number}
     */
    const DECR: number;

    /**
     * @const
     * @type {number}
     */
    const INVERT: number;

    /**
     * @const
     * @type {number}
     */
    const INCR_WRAP: number;

    /**
     * @const
     * @type {number}
     */
    const DECR_WRAP: number;

    /**
     * @const
     * @type {number}
     */
    const VENDOR: number;

    /**
     * @const
     * @type {number}
     */
    const RENDERER: number;

    /**
     * @const
     * @type {number}
     */
    const VERSION: number;

    /**
     * @const
     * @type {number}
     */
    const NEAREST: number;

    /**
     * @const
     * @type {number}
     */
    const LINEAR: number;

    /**
     * @const
     * @type {number}
     */
    const NEAREST_MIPMAP_NEAREST: number;

    /**
     * @const
     * @type {number}
     */
    const LINEAR_MIPMAP_NEAREST: number;

    /**
     * @const
     * @type {number}
     */
    const NEAREST_MIPMAP_LINEAR: number;

    /**
     * @const
     * @type {number}
     */
    const LINEAR_MIPMAP_LINEAR: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE_MAG_FILTER: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE_MIN_FILTER: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE_WRAP_S: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE_WRAP_T: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE_2D: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE_CUBE_MAP: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE_BINDING_CUBE_MAP: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE_CUBE_MAP_POSITIVE_X: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE_CUBE_MAP_NEGATIVE_X: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE_CUBE_MAP_POSITIVE_Y: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE_CUBE_MAP_NEGATIVE_Y: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE_CUBE_MAP_POSITIVE_Z: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE_CUBE_MAP_NEGATIVE_Z: number;

    /**
     * @const
     * @type {number}
     */
    const MAX_CUBE_MAP_TEXTURE_SIZE: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE0: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE1: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE2: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE3: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE4: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE5: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE6: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE7: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE8: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE9: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE10: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE11: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE12: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE13: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE14: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE15: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE16: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE17: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE18: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE19: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE20: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE21: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE22: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE23: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE24: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE25: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE26: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE27: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE28: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE29: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE30: number;

    /**
     * @const
     * @type {number}
     */
    const TEXTURE31: number;

    /**
     * @const
     * @type {number}
     */
    const ACTIVE_TEXTURE: number;

    /**
     * @const
     * @type {number}
     */
    const REPEAT: number;

    /**
     * @const
     * @type {number}
     */
    const CLAMP_TO_EDGE: number;

    /**
     * @const
     * @type {number}
     */
    const MIRRORED_REPEAT: number;

    /**
     * @const
     * @type {number}
     */
    const FLOAT_VEC2: number;

    /**
     * @const
     * @type {number}
     */
    const FLOAT_VEC3: number;

    /**
     * @const
     * @type {number}
     */
    const FLOAT_VEC4: number;

    /**
     * @const
     * @type {number}
     */
    const INT_VEC2: number;

    /**
     * @const
     * @type {number}
     */
    const INT_VEC3: number;

    /**
     * @const
     * @type {number}
     */
    const INT_VEC4: number;

    /**
     * @const
     * @type {number}
     */
    const BOOL: number;

    /**
     * @const
     * @type {number}
     */
    const BOOL_VEC2: number;

    /**
     * @const
     * @type {number}
     */
    const BOOL_VEC3: number;

    /**
     * @const
     * @type {number}
     */
    const BOOL_VEC4: number;

    /**
     * @const
     * @type {number}
     */
    const FLOAT_MAT2: number;

    /**
     * @const
     * @type {number}
     */
    const FLOAT_MAT3: number;

    /**
     * @const
     * @type {number}
     */
    const FLOAT_MAT4: number;

    /**
     * @const
     * @type {number}
     */
    const SAMPLER_2D: number;

    /**
     * @const
     * @type {number}
     */
    const SAMPLER_CUBE: number;

    /**
     * @const
     * @type {number}
     */
    const VERTEX_ATTRIB_ARRAY_ENABLED: number;

    /**
     * @const
     * @type {number}
     */
    const VERTEX_ATTRIB_ARRAY_SIZE: number;

    /**
     * @const
     * @type {number}
     */
    const VERTEX_ATTRIB_ARRAY_STRIDE: number;

    /**
     * @const
     * @type {number}
     */
    const VERTEX_ATTRIB_ARRAY_TYPE: number;

    /**
     * @const
     * @type {number}
     */
    const VERTEX_ATTRIB_ARRAY_NORMALIZED: number;

    /**
     * @const
     * @type {number}
     */
    const VERTEX_ATTRIB_ARRAY_POINTER: number;

    /**
     * @const
     * @type {number}
     */
    const VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: number;

    /**
     * @const
     * @type {number}
     */
    const COMPILE_STATUS: number;

    /**
     * @const
     * @type {number}
     */
    const LOW_FLOAT: number;

    /**
     * @const
     * @type {number}
     */
    const MEDIUM_FLOAT: number;

    /**
     * @const
     * @type {number}
     */
    const HIGH_FLOAT: number;

    /**
     * @const
     * @type {number}
     */
    const LOW_INT: number;

    /**
     * @const
     * @type {number}
     */
    const MEDIUM_INT: number;

    /**
     * @const
     * @type {number}
     */
    const HIGH_INT: number;

    /**
     * @const
     * @type {number}
     */
    const FRAMEBUFFER: number;

    /**
     * @const
     * @type {number}
     */
    const RENDERBUFFER: number;

    /**
     * @const
     * @type {number}
     */
    const RGBA4: number;

    /**
     * @const
     * @type {number}
     */
    const RGB5_A1: number;

    /**
     * @const
     * @type {number}
     */
    const RGB565: number;

    /**
     * @const
     * @type {number}
     */
    const DEPTH_COMPONENT16: number;

    /**
     * @const
     * @type {number}
     */
    const STENCIL_INDEX: number;

    /**
     * @const
     * @type {number}
     */
    const STENCIL_INDEX8: number;

    /**
     * @const
     * @type {number}
     */
    const DEPTH_STENCIL: number;

    /**
     * @const
     * @type {number}
     */
    const RENDERBUFFER_WIDTH: number;

    /**
     * @const
     * @type {number}
     */
    const RENDERBUFFER_HEIGHT: number;

    /**
     * @const
     * @type {number}
     */
    const RENDERBUFFER_INTERNAL_FORMAT: number;

    /**
     * @const
     * @type {number}
     */
    const RENDERBUFFER_RED_SIZE: number;

    /**
     * @const
     * @type {number}
     */
    const RENDERBUFFER_GREEN_SIZE: number;

    /**
     * @const
     * @type {number}
     */
    const RENDERBUFFER_BLUE_SIZE: number;

    /**
     * @const
     * @type {number}
     */
    const RENDERBUFFER_ALPHA_SIZE: number;

    /**
     * @const
     * @type {number}
     */
    const RENDERBUFFER_DEPTH_SIZE: number;

    /**
     * @const
     * @type {number}
     */
    const RENDERBUFFER_STENCIL_SIZE: number;

    /**
     * @const
     * @type {number}
     */
    const FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: number;

    /**
     * @const
     * @type {number}
     */
    const FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: number;

    /**
     * @const
     * @type {number}
     */
    const FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: number;

    /**
     * @const
     * @type {number}
     */
    const FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: number;

    /**
     * @const
     * @type {number}
     */
    const COLOR_ATTACHMENT0: number;

    /**
     * @const
     * @type {number}
     */
    const DEPTH_ATTACHMENT: number;

    /**
     * @const
     * @type {number}
     */
    const STENCIL_ATTACHMENT: number;

    /**
     * @const
     * @type {number}
     */
    const DEPTH_STENCIL_ATTACHMENT: number;

    /**
     * @const
     * @type {number}
     */
    const NONE: number;

    /**
     * @const
     * @type {number}
     */
    const FRAMEBUFFER_COMPLETE: number;

    /**
     * @const
     * @type {number}
     */
    const FRAMEBUFFER_INCOMPLETE_ATTACHMENT: number;

    /**
     * @const
     * @type {number}
     */
    const FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: number;

    /**
     * @const
     * @type {number}
     */
    const FRAMEBUFFER_INCOMPLETE_DIMENSIONS: number;

    /**
     * @const
     * @type {number}
     */
    const FRAMEBUFFER_UNSUPPORTED: number;

    /**
     * @const
     * @type {number}
     */
    const FRAMEBUFFER_BINDING: number;

    /**
     * @const
     * @type {number}
     */
    const RENDERBUFFER_BINDING: number;

    /**
     * @const
     * @type {number}
     */
    const MAX_RENDERBUFFER_SIZE: number;

    /**
     * @const
     * @type {number}
     */
    const INVALID_FRAMEBUFFER_OPERATION: number;

    /**
     * @const
     * @type {number}
     */
    const UNPACK_FLIP_Y_WEBGL: number;

    /**
     * @const
     * @type {number}
     */
    const UNPACK_PREMULTIPLY_ALPHA_WEBGL: number;

    /**
     * @const
     * @type {number}
     */
    const CONTEXT_LOST_WEBGL: number;

    /**
     * @const
     * @type {number}
     */
    const UNPACK_COLORSPACE_CONVERSION_WEBGL: number;

    /**
     * @const
     * @type {number}
     */
    const BROWSER_DEFAULT_WEBGL: number;

    /**
     * From the OES_texture_half_float extension.
     * http://www.khronos.org/registry/webgl/extensions/OES_texture_half_float/
     * @const
     * @type {number}
     */
    const HALF_FLOAT_OES: number;

    /**
     * From the OES_standard_derivatives extension.
     * http://www.khronos.org/registry/webgl/extensions/OES_standard_derivatives/
     * @const
     * @type {number}
     */
    const FRAGMENT_SHADER_DERIVATIVE_HINT_OES: number;

    /**
     * From the OES_vertex_array_object extension.
     * http://www.khronos.org/registry/webgl/extensions/OES_vertex_array_object/
     * @const
     * @type {number}
     */
    const VERTEX_ARRAY_BINDING_OES: number;

    /**
     * From the WEBGL_debug_renderer_info extension.
     * http://www.khronos.org/registry/webgl/extensions/WEBGL_debug_renderer_info/
     * @const
     * @type {number}
     */
    const UNMASKED_VENDOR_WEBGL: number;

    /**
     * From the WEBGL_debug_renderer_info extension.
     * http://www.khronos.org/registry/webgl/extensions/WEBGL_debug_renderer_info/
     * @const
     * @type {number}
     */
    const UNMASKED_RENDERER_WEBGL: number;

    /**
     * From the WEBGL_compressed_texture_s3tc extension.
     * http://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_s3tc/
     * @const
     * @type {number}
     */
    const COMPRESSED_RGB_S3TC_DXT1_EXT: number;

    /**
     * From the WEBGL_compressed_texture_s3tc extension.
     * http://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_s3tc/
     * @const
     * @type {number}
     */
    const COMPRESSED_RGBA_S3TC_DXT1_EXT: number;

    /**
     * From the WEBGL_compressed_texture_s3tc extension.
     * http://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_s3tc/
     * @const
     * @type {number}
     */
    const COMPRESSED_RGBA_S3TC_DXT3_EXT: number;

    /**
     * From the WEBGL_compressed_texture_s3tc extension.
     * http://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_s3tc/
     * @const
     * @type {number}
     */
    const COMPRESSED_RGBA_S3TC_DXT5_EXT: number;

    /**
     * From the EXT_texture_filter_anisotropic extension.
     * http://www.khronos.org/registry/webgl/extensions/EXT_texture_filter_anisotropic/
     * @const
     * @type {number}
     */
    const TEXTURE_MAX_ANISOTROPY_EXT: number;

    /**
     * From the EXT_texture_filter_anisotropic extension.
     * http://www.khronos.org/registry/webgl/extensions/EXT_texture_filter_anisotropic/
     * @const
     * @type {number}
     */
    const MAX_TEXTURE_MAX_ANISOTROPY_EXT: number;
}
