using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Random = UnityEngine.Random;

public class CircleExplosion : MonoBehaviour
{
    public float explosionTime;
    public float explosionSpeed;

    private SphereCollider _collider;
    private float _startTime;
    private static readonly int Color = Shader.PropertyToID("_Color");
    private Renderer _renderer;

    private readonly Color _yellow = new Color(255, 255, 0);
    private readonly Color _red = new Color(255, 0, 0);

    // Start is called before the first frame update
    void Start()
    {
        _renderer = GetComponent<Renderer>();
        _collider = GetComponent<SphereCollider>();
        _startTime = Time.time;
    }

    // Update is called once per frame
    void Update()
    {
        SetExplosionRadius();


        if (Random.Range(0.0f, 1.0f) > 0.5)
        {
            _renderer.material.SetColor(Color, _yellow);
        }
        else
        {
            _renderer.material.SetColor(Color, _red);
        }


        if (Lifetime() > explosionTime)
        {
            Destroy(gameObject);
        }
    }

    private float Lifetime()
    {
        return Time.time - _startTime;
    }

    private void SetExplosionRadius()
    {
        float radius = Lifetime() * explosionSpeed;

        // Debug.Log("Explosion speed: " + explosionSpeed + ", collider radius: " + radius);
        // _collider.radius = radius;
        gameObject.transform.localScale = new Vector3(radius, radius, 0.01f);

    }
}
